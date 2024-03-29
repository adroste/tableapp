"use strict";

const broker = require('../broker');
const db = require('../db').db;
const entriesController = require('./entries');
const notificationsController = require('./notifications');
const statusCodes = require('http-status-codes').StatusCodes;
const utils = require('../utils');


/**
 * Controller for comments.
 * @module commentsController
 */


/**
 * A comment object.
 * Containing non-general comment infos for a single user.
 * @typedef {object} Comment
 * @property {(string|null)} authorId user-id of author, null if comment was posted anonymously
 * @property {string} content text-content of comment
 * @property {Array<string>} imageIds list of (image-)ids of attached images 
 * @property {boolean} isDeleted indicates if comment is deleted
 * @property {boolean} isOwn indicates if user owns comment
 * @property {(string|null)} parentId (comment-)id of parent comment (id of comment this comment is subordinate), null if comment is a top-level comment 
 * @property {number} score score of the comment
 * @property {number} timestamp unix-timestamp in ms indicating submission date
 * @property {number} vote indicates user vote: 0 user did not vote, +1 user upvoted, -1 user downvoted comment
 */


/**
 * Dictionary of comments.
 * 
 * dict[key] = value:
 * * key := id of comment
 * * value := {@link Comment}
 * @typedef {object} CommentDict
 */


// --------- Private ---------

/**
 * Internal method that calls triggers update handlers.
 * @private
 * @function
 * @param {ObjectID} eventId id of event of updated comment
 * @param {ObjectID} entryId id of entry of updated comment
 * @param {ObjectID} commentId id of comment which has been updated
 * @param {boolean} affectsEntryMetadata indicates if update of comment affects metadata of the superordinate entry
 */
function _onCommentUpdated(eventId, entryId, commentId, affectsEntryMetadata) {
    broker.handleCommentUpdated(eventId, entryId, commentId, affectsEntryMetadata);
}


// --------- Public ---------

/**
 * Change a users voting for a specific comment.
 * @static
 * @async
 * @function
 * @param {ObjectID} eventId id of event
 * @param {ObjectID} entryId id of entry
 * @param {ObjectID} commentId id of comment
 * @param {string} userId id of user
 * @param {number} vote number representing vote (>0: upvote, 0: no vote, <0: downvote)
 * @returns {Promise} indicates success
 * @throws {Error} with message: 'commentId not found' with code NOT_FOUND if supplied commentId (for entryId/eventId) does not exist
 */
async function changeUserVote(eventId, entryId, commentId, userId, vote) { // IMPORTANT: set eventId by users activeEventId, to ensure sufficient rights
    if (!eventId || !entryId || !commentId || !userId || vote == null)
        throw utils.createError('all params must be set', statusCodes.BAD_REQUEST);

    const update = {};
    if (vote > 0) {
        update.$addToSet = { upvotes: userId };
        update.$pull = { downvotes: userId };
    } else if (vote < 0) {
        update.$addToSet = { downvotes: userId };
        update.$pull = { upvotes: userId };
    } else {
        update.$pull = { upvotes: userId, downvotes: userId };
    }

    const res = await db().collection('comments')
        .updateOne({ _id: commentId, entryId, eventId }, update);
        
    if (res.result.ok !== 1)
        throw utils.createError('error changing uservote for comment', statusCodes.INTERNAL_SERVER_ERROR);
    if (res.result.n < 1)
        throw utils.createError('commentId not found', statusCodes.NOT_FOUND);
    if (res.result.nModified > 0)
        _onCommentUpdated(eventId, entryId, commentId, false);
}
exports.changeUserVote = changeUserVote;


/**
 * Mark a comment as deleted.
 * @static
 * @async
 * @function
 * @param {ObjectID} eventId id of event
 * @param {ObjectID} entryId id of entry
 * @param {ObjectID} commentId id of comment
 * @returns {Promise} indicates success
 * @throws {Error} with message: 'commentId not found' with code NOT_FOUND if supplied commentId (for entryId/eventId) does not exist
 */
async function deleteComment(eventId, entryId, commentId) {
    if (!eventId || !entryId || !commentId)
        throw utils.createError('all params must be set', statusCodes.BAD_REQUEST);

    const res = await db().collection('comments')
        .updateOne({ _id: commentId, entryId, eventId }, 
            { $set: { 
                isDeleted: true 
            }});

    if (res.result.ok !== 1)
        throw utils.createError('error changing isDeleted for comment', statusCodes.INTERNAL_SERVER_ERROR);
    if (res.result.n < 1)
        throw utils.createError('commentId not found', statusCodes.NOT_FOUND);
    if (res.result.nModified > 0)
        _onCommentUpdated(eventId, entryId, commentId, true);
}
exports.deleteComment = deleteComment;


/**
 * Query comments.
 * 
 * If a comment is deleted (isDeleted == true), its authorId & content props
 * will be returned as 'null' and imageIds will be '[]'.
 * @static
 * @async
 * @function
 * @param {ObjectID} eventId id of event
 * @param {ObjectID} entryId id of entry
 * @param {string} userId id of user
 * @param {Array<ObjectID>} [commentIds=[]] array of ObjectIDs to query. Empty array [] means all. Defaults to []
 * @returns {Promise<CommentsController~CommentDict>} resolves to dictionary of comments (for specified user)
 */
async function getComments(eventId, entryId, userId, commentIds = []) {
    if (!eventId || !entryId || !userId || !commentIds)
        throw utils.createError('all params must be set', statusCodes.BAD_REQUEST);

    const match = { eventId, entryId };
    if (commentIds.length > 0)
        match._id = { $in: commentIds };
    const commentArr = await db().collection('comments').aggregate([
        { $match: match },
        { $project: {
            authorId: 1, 
            content: 1,
            imageIds: 1,
            isDeleted: 1,
            isOwn: { $eq:  [ userId, "$postedById" ] },
            parentId: 1,
            score: { $subtract: [ { $size: "$upvotes" }, { $size: "$downvotes" } ] },
            timestamp: 1,
            vote: { $cond: [ { $in: [ userId, "$upvotes" ] }, 1, { 
                $cond: [ { $in: [ userId, "$downvotes"]}, -1, 0 ] 
            } ] },
        } }
    ]).toArray();

    const commentDict = {};
    commentArr.forEach((comment) => {
        // hide content & authorId if comment is deleted
        if (comment.isDeleted) {
            comment.authorId = null;
            comment.content = null;
            comment.imageIds = [];
        }
        commentDict[comment._id] = comment;
        delete comment._id;
    });
    return commentDict;
}
exports.getComments = getComments;


/**
 * Insert new comment into db.
 * @static
 * @async
 * @function
 * @param {ObjectID} eventId id of event
 * @param {ObjectID} entryId id of entry
 * @param {(ObjectID|null)} parentId id of parent-comment. null for toplevel
 * @param {string} userId id of user
 * @param {boolean} isAnonymous true if posting is anonymous, otherwise false
 * @param {string} content content of comment
 * @param {Array<string>} imageDataArr array of attached images (base64 encoded)
 * @returns {Promise} indicates success
 * @returns {Promise<ObjectID>} resolves to ObjectID of inserted Comment
 */
async function postComment(eventId, entryId, parentId, userId, isAnonymous, content, imageDataArr) {
    if (!eventId || !entryId || !userId || isAnonymous == null || !content || !imageDataArr)
        throw utils.createError('all params must be set', statusCodes.BAD_REQUEST);

    // check if entry exists and is not deleted
    const entryRes = await db().collection('entries').findOne(
        { _id: entryId, eventId },
        { projection : { isDeleted: 1 }}
    );
    if (!entryRes)
        throw utils.createError('entryId not found', statusCodes.NOT_FOUND);
    if (entryRes.isDeleted)
        throw utils.createError('cannot comment a deleted entry', statusCodes.BAD_REQUEST);

    // check if parent comment exists and is not deleted
    if (parentId) {
        const parentRes = await db().collection('comments').findOne(
            { _id: parentId, entryId, eventId },
            { projection: { isDeleted: 1 }}
        );
        if (!parentRes)
            throw utils.createError('parentId not found', statusCodes.NOT_FOUND);
        if (parentRes.isDeleted)
            throw utils.createError('cannot comment a deleted comment', statusCodes.BAD_REQUEST);
    }
    
    // save attached images
    let imageIds = [];
    if (imageDataArr.length) {
        const images = [];
        for (let i = 0; i < imageDataArr.length; ++i)
            images.push({
                data: imageDataArr[i],
                thumbnail: await utils.createThumbnailFromBase64Image(imageDataArr[i])
            });
        const insertRes = await db().collection('images').insertMany(images);
        if (insertRes.result.ok !== 1)
            throw utils.createError('could not save images for new comments');
        imageIds = Object.values(insertRes.insertedIds);
    }

    // insert comment
    const res = await db().collection('comments').insertOne({
        authorId: isAnonymous ? null : userId,
        content,
        downvotes: [],
        entryId,
        eventId,
        imageIds,
        isDeleted: false,
        parentId: parentId ? parentId : null,
        postedById: userId,
        timestamp: Date.now(),
        upvotes: [],
    });

    if (res.insertedCount < 1)
        throw utils.createError('comment could not be posted');
    
    // automatically follow parent entry after comment-post
    entriesController.changeUserFollow(eventId, entryId, userId, true);

    _onCommentUpdated(eventId, entryId, res.insertedId, true);
    notificationsController.newCommentPosted(eventId, entryId, res.insertedId, parentId ? parentId : null, userId, isAnonymous);
    return res.insertedId;
}
exports.postComment = postComment;
