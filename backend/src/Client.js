"use strict";

const ObjectID = require('mongodb').ObjectID;
const EntryListTypeEnum = require('./EntryListTypeEnum');
const EntryListSubscription = require('./EntryListSubscription');
const PermissionLevelEnum = require('./PermissionLevelEnum');
const activityLogController = require('./controller/activityLog');
const adminController = require('./controller/admin');
const commentsController = require('./controller/comments');
const entriesController = require('./controller/entries');
const eventsController = require('./controller/events');
const eventScreenshotsController = require('./controller/eventScreenshots');
const imagesController = require('./controller/images');
const notificationsController = require('./controller/notifications');
const sessionLogController = require('./controller/sessionLog');
const userController = require('./controller/user');
const broker = require('./broker');
const utils = require('./utils');
const statusCodes = require('http-status-codes').StatusCodes;


let curClientId = 0;


/**
 * Class representing a single client connection.
 */
class Client {
    /**
     * Creates a Client instance.
     * @param {SocketIoConnection} socket socket connection to client
     */
    constructor(socket) {
        // public properties
        /**
         * Timestamp of connect-event.
         * @type {number}
         */
        this.connectTimestamp = Date.now();
        /**
         * Internal (process-unique) id for a client.
         * @type {number}
         */
        this.id = curClientId++;
        /**
         * IP-Address of connected client.
         * @type {string}
         */
        this.ip = socket.request.connection.remoteAddress;
        /**
         * User-Agent of connected client.
         * @type {string}
         */
        this.userAgent = socket.request.headers['user-agent'];

        // private properties
        /**
         * Open socket connection to client.
         * @private
         * @type {SocketIoConnection}
         */
        this._socket = socket;

        // init/reset client-state
        this._init();

        // setup listeners
        this.on('disconnect',                           this._handleDisconnect, {
        });

        // admin
        this.on('admin/adminLogin',                     this._handleAdminLogin, {
            requiresAuthentication: true
        });
        this.on('admin/createNewEvent',                 this._handleCreateNewEvent, {
            requiresAuthentication: true
        });
        this.on('admin/sendTestEmail',                 this._handleSendTestEmail, {
            requiresAuthentication: true
        });

        // comments
        this.on('comments/changeVote',                  this._handleChangeVoteForComment, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('comments/deleteComment',               this._handleDeleteComment, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('comments/postComment',                 this._handlePostComment, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('comments/readComment',                 this._handleReadComment, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('comments/subscribeCommentsForEntry',   this._handleSubscribeCommentsForEntry, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('comments/unsubscribeCommentsForEntry', this._handleUnsubscribeCommentsForEntry, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });

        // desktopApp
        this.on('desktopApp/broadcastNewImage',         this._handleBroadcastNewImage, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });

        // entries
        this.on('entries/changeBookmark',               this._handleChangeBookmark, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('entries/changeFollow',                 this._handleChangeFollow, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('entries/changeVote',                   this._handleChangeVote, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('entries/deleteEntry',                  this._handleDeleteEntry, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('entries/loadMoreEntries',              this._handleLoadMoreEntries, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('entries/postEntry',                    this._handlePostEntry, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('entries/readEntry',                    this._handleReadEntry, {
            requiresActiveEvent: true,
            requiresAuthentication: true,
        });
        this.on('entries/subscribeEntries',             this._handleSubscribeEntries, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('entries/subscribeEntryList',           this._handleSubscribeEntryList, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('entries/unsubscribeEntries',           this._handleUnsubscribeEntries, {
            requiresActiveEvent: true,
            requiresAuthentication: true
        });
        this.on('entries/unsubscribeEntryList',         this._handleUnsubscribeEntryList, {
            // requiresActiveEvent: true, // prevent error log from ui transition
            // requiresAuthentication: true
        });
        
        // events
        this.on('events/changeEventName',               this._handleChangeEventName, {
            requiresAuthentication: true
        });
        this.on('events/changeEventRoleList',           this._handleChangeEventRoleList, {
            requiresAuthentication: true
        });
        this.on('events/changeUserPermissionLevelAndRole', this._handleChangeUserPermissionLevelAndRole, {
            requiresAuthentication: true
        });
        this.on('events/subscribeFullEventDict',        this._handleSubscribeFullEventDict, {
            requiresAuthentication: true
        });
        this.on('events/unsubscribeFullEventDict',      this._handleUnsubscribeFullEventDict, {
            requiresAuthentication: true
        });
        this.on('events/joinEvent',                     this._handleJoinEvent, {
            requiresAuthentication: true
        });
        this.on('events/leaveEvent',                    this._handleLeaveEvent, {
            requiresAuthentication: true
        });
        this.on('events/switchActiveEvent',             this._handleSwitchActiveEvent, {
            requiresAuthentication: true
        });

        // images
        this.on('images/loadImages',                    this._handleLoadImages, {
            requiresAuthentication: true
        });

        // notifications
        this.on('notifications/markUnreadNotifications',this._handleMarkUnreadNotifications, {
            requiresAuthentication: true
        });
        this.on('notifications/readNotification',       this._handleReadNotification, {
            requiresAuthentication: true
        });

        // user
        this.on('user/acceptTos',                       this._handleAcceptTos, {
            requiresAuthentication: true
        });
        // extra-code for surveys
        this.on('user/addExtSurveyIdDone',              this._handleAddExtSurveyIdDone, {
            requiresAuthentication: true
        });
        this.on('user/changeActiveNotificationTypes',   this._handleChangeActiveNotificationTypes, {
            requiresAuthentication: true
        });
        this.on('user/continueSession',                 this._handleContinueSession, {
        });
        this.on('user/getActiveNotificationTypes',      this._handleGetActiveNotificationTypes, {
            requiresAuthentication: true
        });
        this.on('user/login',                           this._handleLogin, {
        });
        this.on('user/logout',                          this._handleLogout, {
            requiresAuthentication: true
        });
    }



    //#region private
    // --------- Private ---------

    //#region general
    /**
     * Initializes / resets client-state properties.
     * @private
     * @function
     */
    _init() {
        // public properties
        /**
         * Id of active event.
         * @type {(ObjectID|null)}
         */
        this.activeEventId = null;
        /**
         * Indicates if logged in as (super) admin.
         * @type {boolean}
         */
        this.adminLoggedIn = false;
        /**
         * Id of entry client subscribed comments of.
         * Null indicates that no comments(-updates/-data) are subscribed.
         * @type {(ObjectID|null)}
         */
        this.commentsSubscribedForEntryId = null;
        /**
         * Infos about clients subscribed entries.
         */
        this.entriesSubscription = {
            /**
             * List subscription instance.
             * Null indicates that no list subscription is active.
             * @type {(EntryListSubscription|null)}
             */
            listSubscription: null,
            /**
             * List of subscribed entryIds.
             * @type {Array<ObjectID>}
             */
            subscribedIds: [],
        };
        /**
         * Indicates if auth-user has accepted the terms of service.
         * @type {boolean}
         */
        this.hasAcceptedTos = false;
        /**
         * Timestamp of login / continue session.
         * @type {(number|null)}
         */
        this.loginTimestamp = null;
        /**
         * Permissionlevel of user for active event. 
         * Defaults to NOT_A_USER.
         * @type {PermissionLevelEnum}
         */
        this.permissionLevel = PermissionLevelEnum.NOT_A_USER;
        /**
         * Currently used sessionToken (by authenticated user).
         * @type {(string|null)}
         */
        this.sessionToken = null;
        /**
         * Indicates if client subcribed to full EventDict.
         * Defaults to false.
         * @type {boolean}
         */
        this.subscribedFullEventDict = false;
        /**
         * Id of authenticated user.
         * @type {(string|null)}
         */
        this.userId = null;
    }


    /**
     * Eventhandler for socket disconnect event.
     * @async
     * @private
     * @function
     */
    async _handleDisconnect() {
        await this._trackAndSaveUserSessionInfos();
        this._socket = null;
        broker.unregisterClient(this);
    }


    async _logActivity(activity, data) {
        if (!this.userId) {
            console.error('calling log activity without userId being set is forbidden', activity, data);
            return;
        }
        await activityLogController.logActivity(activity, this.userId, this.activeEventId, data);
    }


    /**
     * Initializes instance-state by users login-data.
     * @async
     * @private
     * @function
     * @param {UserController~LoginData} loginData loginData object
     * @returns {Promise} 
     */
    async _setupAfterAuthentication(loginData) {
        // this.activeEventId = loginData.activeEventId;
        this.hasAcceptedTos = loginData.hasAcceptedTos;
        this.loginTimestamp = Date.now();
        this.sessionToken = loginData.sessionToken;
        this.userId = loginData.id;
        this._logActivity('user/beginSession', { ip: this.ip, userAgent: this.userAgent });
        this.emitUpdateEventDict(await eventsController.getEventDict(this.userId));
        this.emitUpdateNotificationDict(await notificationsController.getUnreadInAppClientNotificationDict(this.userId));
        // if (this.activeEventId)
        //     await this._switchActiveEvent(this.activeEventId);
    }


    /**
     * Saves session-infos for user.
     * @async
     * @private
     * @function
     * @returns {Promise} 
     */
    async _trackAndSaveUserSessionInfos() {
        if (!this.userId)
            return;
        const logoutTimestamp = Date.now();
        await sessionLogController.saveSessionInfo(this.userId, 
            this.loginTimestamp, logoutTimestamp, this.sessionToken, this.ip, this.userAgent);
        const sessionDurationSec = Math.round((logoutTimestamp - this.loginTimestamp) / 1000);
        this._logActivity('user/endSession', { sessionDurationSec });
    }


    //#endregion general

    //#region admin

    /**
     * Eventhandler for admin login.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.password password
     * @returns {Promise}
     */
    async _handleAdminLogin({ password }) {
        const success = await adminController.checkAdminPassword(password);
        this._logActivity('admin/adminLogin', { success });
        this.adminLoggedIn = success;
        if (!success)
            throw utils.createError('access denied', statusCodes.UNAUTHORIZED);
        return true;
    }


    /**
     * Eventhandler for creating a new event.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.title title
     * @param {string} data.customId custom id for new event
     * @returns {Promise}
     */
    async _handleCreateNewEvent({ title, customId }) {
        try {
            if (customId)
                customId = new ObjectID(customId);
        } catch (err) {
            throw utils.createError('customId invalid', statusCodes.BAD_REQUEST);
        }
        const id = await adminController.createNewEvent(this.userId, title, customId || null);
        this._logActivity('admin/createNewEvent', { title, id: 3 });
        return id;
    }


    /**
     * Eventhandler for sending a test email.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.email email to send to
     * @returns {Promise}
     */
    async _handleSendTestEmail({ email }) {
        adminController.sendTestEmail(email);
        this._logActivity('admin/sendTestEmail', { email });
    }


    //#endregion admin

    //#region comments
    /**
     * Eventhandler for vote change on comment. 
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.commentId commentId (as string)
     * @param {string} data.entryId entryId (as string)
     * @param {number} data.vote number representing vote (>0: upvote, 0: no vote, <0: downvote)
     * @returns {Promise} 
     */
    async _handleChangeVoteForComment({ commentId, entryId, vote }) {
        commentId = new ObjectID(commentId);
        entryId = new ObjectID(entryId);
        await commentsController.changeUserVote(this.activeEventId, 
            entryId, commentId, this.userId, vote);
        this._logActivity('comments/changeVote', { commentId, entryId, vote });
    }


    /**
     * Eventhandler for comment deletion. 
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.commentId commentId (as string)
     * @param {string} data.entryId entryId (as string)
     * @returns {Promise} 
     */
    async _handleDeleteComment({ commentId, entryId }) {
        // TODO ensure sufficient permissions
        commentId = new ObjectID(commentId);
        entryId = new ObjectID(entryId);
        await commentsController.deleteComment(this.activeEventId, entryId, commentId);
        this._logActivity('comments/deleteComment', { commentId, entryId });
    }


    /**
     * Eventhandler for new comment posted. 
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.content content of comment
     * @param {string} data.entryId entryId (as string)
     * @param {Array<string>} data.imageDataArr array of attached images (base64 encoded)
     * @param {boolean} data.isAnonymous true if posting is anonymous, otherwise false
     * @param {(string|null)} data.parentId id of parent-comment (as string). null for toplevel
     * @returns {Promise} 
     */
    async _handlePostComment({ content, entryId, imageDataArr, isAnonymous, parentId }) {
        entryId = new ObjectID(entryId);
        parentId = parentId ? new ObjectID(parentId) : null;
        const commentId = await commentsController.postComment(
            this.activeEventId, entryId, parentId, this.userId, 
            isAnonymous, content, imageDataArr);
        this._logActivity('comments/postComment', { commentId, entryId, parentId });
    }


    /**
     * Eventhandler for comment was read by user. 
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.commentId commentId (as string)
     * @param {string} data.entryId id of entry (as string)
     * @param {boolean} data.isScrollOver true if read-event was triggered while scrolling over comment, false otherwise (focus, click)
     * @returns {Promise} 
     */
    async _handleReadComment({ commentId, entryId, isScrollOver }) {
        commentId = new ObjectID(commentId);
        entryId = new ObjectID(entryId);
        this._logActivity('comments/readComment', { commentId, entryId, isScrollOver });
    }


    /**
     * Eventhandler for comment subscription request (for entry).
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.entryId entryId (as string)
     * @returns {Promise<CommentsController~CommentDict>} returns dict of comments
     */
    async _handleSubscribeCommentsForEntry({ entryId }) {
        entryId = new ObjectID(entryId);
        const commentDict = await commentsController.getComments(
            this.activeEventId, entryId, this.userId);
        this.commentsSubscribedForEntryId = entryId;
        this._logActivity('comments/viewCommentList', { entryId });
        return commentDict;
    }


    /**
     * Eventhandler for comment unsubscription request.
     * @async
     * @private
     * @function
     * @returns {Promise} 
     */
    async _handleUnsubscribeCommentsForEntry() {
        this.commentsSubscribedForEntryId = null;
    }


    //#endregion comments

    //#region desktopApp
    /**
     * Eventhandler for image/screenshot broadcast.
     * @async
     * @private
     * @function
     * @param {object} data
     * @param {string} data.imageData base64 image-data of full image
     * @returns {Promise} 
     */
    async _handleBroadcastNewImage({ imageData }) {
        await eventScreenshotsController.addImageForEvent(this.activeEventId, imageData);
        this._logActivity('desktopApp/broadcastNewImage');
    }

        
    //#endregion desktopApp

    //#region entries
    /**
     * Eventhandler for bookmark changed (for entry).
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.entryId id of entry (as string)
     * @param {boolean} data.bookmark true sets bookmark, false unsets
     * @returns {Promise} 
     */
    async _handleChangeBookmark({ entryId, bookmark }) {
        entryId = new ObjectID(entryId);
        await entriesController.changeUserBookmark(
            this.activeEventId, entryId, this.userId, bookmark);
        this._logActivity('entries/changeBookmark', { entryId, bookmark });
    }


    /**
     * Eventhandler for follow-state changed (for entry).
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.entryId id of entry (as string)
     * @param {boolean} data.follow true sets follow, false unsets
     * @returns {Promise} 
     */
    async _handleChangeFollow({ entryId, follow }) {
        entryId = new ObjectID(entryId);
        await entriesController.changeUserFollow(
            this.activeEventId, entryId, this.userId, follow);
        this._logActivity('entries/changeFollow', { entryId, follow });
    }


    /**
     * Eventhandler for vote change on entry. 
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.entryId entryId (as string)
     * @param {number} data.vote number representing vote (>0: upvote, 0: no vote, <0: downvote)
     * @returns {Promise} 
     */
    async _handleChangeVote({ entryId, vote }) {
        entryId = new ObjectID(entryId);
        await entriesController.changeUserVote(
            this.activeEventId, entryId, this.userId, vote);
        this._logActivity('entries/changeVote', { entryId, vote });
    }

    
    /**
     * Eventhandler for entry deletion. 
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.entryId entryId (as string)
     * @returns {Promise} 
     */
    async _handleDeleteEntry({ entryId }) {
        // TODO ensure sufficient permissions
        entryId = new ObjectID(entryId);
        await entriesController.deleteEntry(this.activeEventId, entryId);
        this._logActivity('entries/deleteEntry', { entryId });
    }


    /**
     * Result of _handleLoadMoreEntries call.
     * @typedef {object} Client~LoadMoreEntriesResult
     * @property {EntriesController~EntryDict} entryDict dict containing next entries
     * @property {boolean} hasMoreEntriesToLoad indicates if more entries can be loaded
     * @property {Array<ObjectID>} idList array of entry-ids (see EntryListSubscription.getIdList())
     */


    /**
     * Eventhandler for load more entries request (depends on active list subscription).
     * @async
     * @private
     * @function
     * @returns {Promise<Client~LoadMoreEntriesResult>} returns more entries 
     */
    async _handleLoadMoreEntries() {
        if (!this.entriesSubscription.listSubscription)
            throw utils.createError('there must be a subscription to an entrylist', statusCodes.FAILED_DEPENDENCY);
        
        const res = await this.entriesSubscription.listSubscription.getMoreEntries();
        const entryDict = await entriesController
            .getEntries(this.activeEventId, this.userId, res.addedEntryIds);
        return { 
            entryDict, 
            hasMoreEntriesToLoad: res.hasMoreEntriesToLoad,
            idList: this.entriesSubscription.listSubscription.getIdList(),
        };
    }


    /**
     * Eventhandler for new entry posted. 
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.content content of comment
     * @param {Array<string>} data.imageDataArr array of attached images (base64 encoded)
     * @param {boolean} data.isAnonymous true if posting is anonymous, otherwise false
     * @returns {Promise} 
     */
    async _handlePostEntry({ content, imageDataArr, isAnonymous }) {
        const entryId = await entriesController.postEntry(
            this.activeEventId, this.userId, isAnonymous, content, imageDataArr);
        this._logActivity('entries/postEntry', { entryId });
    }


    /**
     * Eventhandler for entry was read by user. 
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.entryId id of entry (as string)
     * @param {boolean} data.isScrollOver true if read-event was triggered while scrolling over entry, false otherwise (focus, click)
     * @returns {Promise} 
     */
    async _handleReadEntry({ entryId, isScrollOver }) {
        entryId = new ObjectID(entryId);
        this._logActivity('entries/readEntry', { entryId, isScrollOver });
    }


    /**
     * Eventhandler for subscribe to entries request (by ids).
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {Array<string>} data.entryIds array of entryIds (as strings)
     * @returns {Promise<EntriesController~EntryDict>} resolves to dictionary of entries (that were subscribed)
     */
    async _handleSubscribeEntries({ entryIds }) {
        entryIds = entryIds.map((id) => new ObjectID(id));
        const entryDict = await entriesController
            .getEntries(this.activeEventId, this.userId, entryIds);
        entryIds.forEach((id) => {
            if (entryDict[id] !== null // filter for non existent values
                    && this.entriesSubscription.subscribedIds.findIndex((cur) => cur.equals(id)) === -1)
                this.entriesSubscription.subscribedIds.push(id);
        });
        return entryDict;
    }


    /**
     * Eventhandler for subscribe to entry-list request.
     * @private
     * @function
     * @param {object} data 
     * @param {EntryListTypeEnum} data.listType list type
     * @param {boolean} data.onlyBookmarked indicates if only bookmarked entries should be included in subscription
     */
    _handleSubscribeEntryList({ listType, onlyBookmarked }) {
        this.entriesSubscription.listSubscription = null;
        if (!Object.values(EntryListTypeEnum).includes(listType))
            throw utils.createError('listType not defined', statusCodes.BAD_REQUEST);
        this.entriesSubscription.listSubscription = new EntryListSubscription(
            entriesController, listType, this.activeEventId, 
            this.userId, onlyBookmarked);
        this._logActivity('entries/viewEntryList', { listType, onlyBookmarked });
    }


    /**
     * Eventhandler for unsubscribe from (previously subscribed) entries request (by ids).
     * @private
     * @function
     * @param {object} data 
     * @param {Array<string>} data.entryIds array of entryIds (as strings)
     */
    _handleUnsubscribeEntries({ entryIds }) {
        entryIds = entryIds.map((id) => new ObjectID(id));
        entryIds.forEach((id) => {
            const idx = this.entriesSubscription.subscribedIds.findIndex((cur) => cur.equals(id));
            if (idx !== -1)
                this.entriesSubscription.subscribedIds.splice(idx, 1);
        });
    }


    /**
     * Eventhandler for unsubscribe from (previously subscribed) entry-list request.
     * @private
     * @function
     */
    _handleUnsubscribeEntryList() {
        this.entriesSubscription.listSubscription = null;
    }


    //#endregion entries

    //#region events
    /**
     * Eventhandler for change event name/title request.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.eventId eventId (as string)
     * @param {string} data.newName new name of event
     * @returns {Promise}
     */
    async _handleChangeEventName({ eventId, newName }) {
        eventId = new ObjectID(eventId);
        const event = (await eventsController.getEventDict(
            this.userId, true, [eventId]))[eventId];
        if (event.permissionLevel < PermissionLevelEnum.ADMINISTRATOR)
            throw utils.createError('unsufficient rights to change title of event', statusCodes.FORBIDDEN);
        eventsController.changeEventName(eventId, newName);
        this._logActivity('events/changeEventName', { eventId, newName });
    }


    /**
     * Eventhandler for change event RoleList request.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.eventId eventId (as string)
     * @param {RoleList} data.roleList new role list
     * @returns {Promise}
     */
    async _handleChangeEventRoleList({ eventId, roleList }) {
        eventId = new ObjectID(eventId);
        const event = (await eventsController.getEventDict(
            this.userId, true, [eventId]))[eventId];
        if (event.permissionLevel < PermissionLevelEnum.ADMINISTRATOR)
            throw utils.createError('unsufficient rights to change role list of event', statusCodes.FORBIDDEN);
        eventsController.changeEventRoleList(eventId, roleList);
        this._logActivity('events/changeEventRoleList', { eventId, roleList });
    }


    /**
     * Eventhandler for change event RoleList request.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.eventId eventId (as string)
     * @param {string} data.userId id of user subject to change
     * @param {PermissionLevelEnum} data.permissionLevel new permissionLevel for user
     * @param {(string|null)} data.roleId id of new role for user. null or '' will remove the current role
     * @returns {Promise}
     */
    async _handleChangeUserPermissionLevelAndRole({ eventId, userId, permissionLevel, roleId }) {
        eventId = new ObjectID(eventId);
        const event = (await eventsController.getEventDict(
            this.userId, true, [eventId]))[eventId];
        if (event.permissionLevel < PermissionLevelEnum.ADMINISTRATOR)
            throw utils.createError('unsufficient rights to change user permission level and role of event', statusCodes.FORBIDDEN);
        eventsController.changeUserPermissionLevelForEvent(eventId, userId, permissionLevel);
        eventsController.changeUserRoleForEvent(eventId, userId, roleId);
        this._logActivity('events/changeUserPermissionLevelAndRole', { eventId, userId, permissionLevel, roleId });
    }


    /**
     * Eventhandler for subscribe to full EventDict request.
     * @async
     * @private
     * @function
     * @returns {Promise} 
     */
    async _handleSubscribeFullEventDict() {
        this.subscribedFullEventDict = true;        
        const fullDict = await eventsController.getEventDict(this.userId, true);
        this.emitUpdateEventDict(fullDict);
    }


    /**
     * Eventhandler for unsubscribe from full EventDict request.
     * @private
     * @function
     */
    _handleUnsubscribeFullEventDict() {
        this.subscribedFullEventDict = false;                
    }


    /**
     * Eventhandler for join-event request.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.eventId eventId (as string)
     * @returns {Promise}
     */
    async _handleJoinEvent({ eventId }) {
        eventId = new ObjectID(eventId);
        await eventsController.changeUserPermissionLevelForEvent(
            eventId, this.userId, PermissionLevelEnum.USER);
        this._logActivity('events/joinEvent', { eventId });
    }


    /**
     * Eventhandler for leave-event request.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.eventId eventId (as string)
     * @returns {Promise}
     */
    async _handleLeaveEvent({ eventId }) {
        eventId = new ObjectID(eventId);
        await eventsController.changeUserPermissionLevelForEvent(
            eventId, this.userId, PermissionLevelEnum.NOT_A_USER);
        this._logActivity('events/leaveEvent', { eventId });
        if (this.activeEventId.equals(eventId))
            await this._switchActiveEvent(null);
    }


    /**
     * Eventhandler for switch-active-event request.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.eventId eventId (as string)
     * @returns {Promise}
     */
    async _handleSwitchActiveEvent({ eventId }) {
        // todo check if input can be converted to ObjectID, if not throw better error
        // also do this for the other message handlers
        await this._switchActiveEvent(new ObjectID(eventId));
    }


    /**
     * Performs switch of active event. Initializes corresponding client context.
     * @async
     * @private
     * @function
     * @param {(ObjectID|null)} newEventId id of event to switch to
     * @returns {Promise} indicates success
     * @todo reorganize position of this function
     */
    async _switchActiveEvent(newEventId) {
        this._logActivity('events/switchActiveEvent', { fromEventId: this.activeEventId, toEventId: newEventId });
        this.commentsSubscribedForEntryId = null;
        this.entriesSubscription = {
            listSubscription: null,
            subscribedIds: [],
        };
        this.permissionLevel = PermissionLevelEnum.NOT_A_USER;

        // newEventId = null is defined and expected behaviour
        if (newEventId !== null && !await eventsController.isEventIdValid(newEventId))
            throw utils.createError('eventId not found', statusCodes.NOT_FOUND);        

        this.activeEventId = newEventId;
        await userController.saveLastActiveEventId(this.userId, this.activeEventId);
        if (!this.activeEventId)
            return;

        await this.updateEventDict([this.activeEventId]);

        const event = (await eventsController.getEventDict(
            this.userId, true, [newEventId]))[newEventId];
        this.permissionLevel = event.permissionLevel;
        
        const withPermissionLevelAndEmail = this.permissionLevel >= PermissionLevelEnum.ADMINISTRATOR;
        this.emitUpdateUserDict(await eventsController.getUserDict(
            this.activeEventId, true, withPermissionLevelAndEmail));

        await this.updateRoleList(this.activeEventId);

        this.emitUpdateEventScreenshotIds(
            await eventScreenshotsController.getScreenshotIdsForEvent(this.activeEventId));
    }


    //#endregion events

    //#region images
    /**
     * Eventhandler for load images request.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {Array<string>} data.imageIds array of ids of images (as string) to retrieve
     * @param {boolean} data.onlyThumbnails indicates if only the thumbnails should be queried
     * @returns {Promise<ImagesController~GetImagesResult>} resolves to an object containing an imageDict and thumbnailDict property, if onlyThumbnails is set imageDict will be an empty object
     */
    async _handleLoadImages({ imageIds, onlyThumbnails }) {
        imageIds = imageIds.map((id) => new ObjectID(id));
        return await imagesController.getImages(imageIds, onlyThumbnails);
    }


    //#endregion images

    //#region notifications
    /**
     * Eventhandler for marking all unread notification as read by user. 
     * @async
     * @private
     * @function
     * @returns {Promise} 
     */
    async _handleMarkUnreadNotifications() {
        await notificationsController.markAllUnreadInAppNotificationsAsRead(this.userId);
        this._logActivity('notifications/markAllUnreadNotificationsAsRead');
    }


    /**
     * Eventhandler for notification was read by user. 
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.notificationId id of notification (as string)
     * @param {boolean} data.inAppClick indicates if read was triggered by in-app click or indirect (e.g. mail-link)
     * @returns {Promise} 
     */
    async _handleReadNotification({ notificationId, inAppClick }) {
        // todo catch invalid notificationId -> throw bad-request
        notificationId = new ObjectID(notificationId);
        await notificationsController.markNotificationIdAsRead(notificationId);
        this._logActivity('notifications/readNotification', { notificationId, inAppClick });
    }


    //#endregion notifications

    //#region user
    /**
     * Eventhandler for accept terms of service request.
     * @async
     * @private
     * @function
     * @returns {Promise}
     */
    async _handleAcceptTos() {
        await userController.acceptTos(this.userId);
        this._logActivity('user/acceptTos');
    }


    // extra-code for surveys
    async _handleAddExtSurveyIdDone({ extSurveyId }) {
        await userController.addExtSurveyIdDone(this.userId, extSurveyId);
    }


    /**
     * Eventhandler for changing active notifications for user request.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {Array<NotificationTypesEnum>} data.emailNotifications array of activated email notification types
     * @param {Array<NotificationTypesEnum>} data.inAppNotifications array of activated in-app notification types
     * @returns {Promise}
     */
    async _handleChangeActiveNotificationTypes({ emailNotifications, inAppNotifications }) {
        await userController.changeActiveNotificationTypes(this.userId, emailNotifications, inAppNotifications);
        this._logActivity('user/changeActiveNotificationTypes');
    }


    /**
     * Eventhandler for continue session request.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.sessionToken sessionToken
     * @returns {Promise<UserController~LoginData>} returns loginData
     */
    async _handleContinueSession({ sessionToken }) {
        try {
            const loginData = await userController.continueSession(sessionToken);
            await this._setupAfterAuthentication(loginData);
            return loginData;
        } catch (err) {
            err.statusCode = statusCodes.UNAUTHORIZED;
            throw err;
        }
    }


    /**
     * Eventhandler for retrieving active notifications for user request.
     * @async
     * @private
     * @function
     * @returns {Promise<object>} resolves to object containing emailNotifications and inAppNotifications
     */
    async _handleGetActiveNotificationTypes() {
        return await userController.getActiveNotificationTypes(this.userId);
    }


    /**
     * Eventhandler for login request.
     * @async
     * @private
     * @function
     * @param {object} data 
     * @param {string} data.email email of user
     * @param {string} data.password password of user
     * @returns {Promise<UserController~LoginData>} returns loginData
     */
    async _handleLogin({ email, password }) {
        try {
            const loginData = await userController.login(email, password);
            await this._setupAfterAuthentication(loginData);
            return loginData;
        } catch (err) {
            if (err.name === 'InvalidCredentialsError' 
                    || err.statusCode === statusCodes.NOT_FOUND 
                    || err.statusCode === statusCodes.BAD_REQUEST) {
                console.log(`login failed ${this.id} ${this.ip} ${email}`);
                err.doNotLog = true;
            }
            err.statusCode = statusCodes.UNAUTHORIZED;
            throw err;
        }
    }


    /**
     * Eventhandler for logout request.
     * @async
     * @private
     * @function
     */
    async _handleLogout() {
        await this._trackAndSaveUserSessionInfos();
        this._logActivity('user/logout');
        this._init(); // reset client-state 
    }


    //#endregion user

    //#endregion private

    //#region public
    // --------- Public ---------    

    //#region general
    /**
     * Handler for client-event.
     * Can be async.
     * Response data must be returned.
     * @callback Client~eventHandler
     * @param {object} data event-data
     */


    /**
     * Registers an event-handler. Calls event handler with current context (this).
     * @param {string} event event-identifier
     * @param {Client~eventHandler} handler event-handler
     * @param {object} [options] additional options
     * @param {boolean} [options.requiresActiveEvent=false] true if event-handler requires an event to be active
     * @param {boolean} [options.requiresAuthentication=false] true if event-handler requries authentication
     * @param {PermissionLevelEnum} [options.requiredPermissionLevel=PermissionLevelEnum.NOT_A_USER] required permission level
     */
    on(event, handler, options) {
        const opts = {
            requiresActiveEvent: false,
            requiresAuthentication: false, 
            requiredPermissionLevel: PermissionLevelEnum.NOT_A_USER, 
            ...options,
        };

        this._socket.on(event, async (data, cb) => {
            const debugInfo = `\t${event.padEnd(40)}\t${this.id}\t${this.userId}`;
            try {
                let err = null;
                // check for authentication
                if (opts.requiresAuthentication && !this.userId)
                    err = utils.createError('authentication required', statusCodes.UNAUTHORIZED);
                // check for activeEvent set
                if (opts.requiresActiveEvent && !this.activeEventId)
                    err = utils.createError('event requires an event to be active', statusCodes.FAILED_DEPENDENCY);
                if (err) {
                    console.warn('EVENT', debugInfo, err.statusCode, err);
                    return cb(utils.createError(`${event} failed`, err.statusCode));
                }
                // handle event with current context, Promise.resolve is needed to support async and sync handlers
                // in case of error: handler is responsible for calling socket-cb with custom error data
                const profileStart = Date.now();
                const res = await Promise.resolve(handler.call(this, data));
                console.debug('EVENT', debugInfo, `\t+${Date.now() - profileStart}ms`);
                if (cb)
                    cb(null, res);
            } catch (err) {
                if (!err.doNotLog)
                    console.error('EVENT', debugInfo, err.statusCode, err);
                if (cb)
                    cb(utils.createError(`${event} failed`, err.statusCode));
            }
        });
    }


    //#endregion general

    //#region comments
    /**
     * Sends specified CommentDict to client.
     * @function
     * @param {CommentsController~CommentDict} commentDict CommentDict to send
     */
    emitUpdateCommentDict(commentDict) {
        this._socket.emit('comments/updateCommentDict', commentDict);
    }


    /**
     * Sends a specified comment by its id to client.
     * Should get called when subscribed comment got updated.
     * @function
     * @param {ObjectID} entryId id of entry of updated comment
     * @param {ObjectID} commentId id of comment which has been updated
     * @returns {Promise} indicates success
     */
    async updateComment(entryId, commentId) {
        const commentDict = await commentsController
            .getComments(this.activeEventId, entryId, this.userId, [commentId]);
        this.emitUpdateCommentDict(commentDict);
    }


    //#endregion comments

    //#region entries
    /**
     * Sends specified EntryDict (and optional corresponding idList from list subscription) to client.
     * @function
     * @param {EntriesController~EntryDict} entryDict EntryDict to send
     * @param {Array<ObjectID>} [idList] updated id list for list subscription (optional)
     */
    emitUpdateEntries(entryDict, idList) {
        //TODO convert object-ids from idList to strings, this should not happen implicitly
        this._socket.emit('entries/updateEntries', { entryDict, idList });
    }


    /**
     * Checks if client subscribed to entry (specified by EntryInfo), 
     * updates list subscription and sends entry-update to client if neccessary.
     * @async
     * @function
     * @param {EntriesController~EntryInfo} entryInfo EntryInfo of entry to update
     * @returns {Promise} indicates success
     */
    async updateEntry(entryInfo) {
        let idList = undefined;
        if (this.entriesSubscription.listSubscription) {
            idList = await this.entriesSubscription.listSubscription.updateEntry(entryInfo) ?
                this.entriesSubscription.listSubscription.getIdList() : undefined;
        }

        if (!idList && this.entriesSubscription.subscribedIds
            .findIndex((cur) => cur.equals(entryInfo._id)) === -1)
            return; 

        const entryDict = await entriesController
            .getEntries(this.activeEventId, this.userId, [entryInfo._id]);
        // TODO only send idList if changed
        this.emitUpdateEntries(entryDict, idList);
    }


    //#endregion entries

    //#region eventInfo
    /**
     * Sends a specified RoleList to client.
     * @function
     * @param {EventsController~RoleList} roleList role-list to send
     */
    emitUpdateRoleList(roleList) {
        this._socket.emit('eventInfo/updateRoleList', roleList);
    }


    /**
     * Sends a specified UserDict to client.
     * @function
     * @param {EventsController~UserDict} userDict UserDict to send
     */
    emitUpdateUserDict(userDict) {
        this._socket.emit('eventInfo/updateUserDict', userDict);
    }


    /**
     * Retrieves role list for given eventId and sends it to the client.
     * @async
     * @function
     * @param {ObjectID} eventId eventId for event which roles to update
     * @returns {Promise} indicates success
     */
    async updateRoleList(eventId) {
        this.emitUpdateRoleList(await eventsController.getRoleList(eventId));
    }


    //#endregion eventInfo

    //#region events
    /**
     * Sends a specified EventDict to client.
     * @function
     * @param {EventsController~EventDict} eventDict EventDict to send
     */
    emitUpdateEventDict(eventDict) {
        this._socket.emit('events/updateEventDict', eventDict);
    }


    /**
     * Retrieves event-data for specified eventIds 
     * and sends an EventDict-update to the client.
     * @async
     * @function
     * @param {Array<ObjectID>} eventIds array of eventIds that got updated 
     * and need to be updated on the client
     * @returns {Promise} indicates success
     */
    async updateEventDict(eventIds) {
        const dictUpdate = await eventsController
            .getEventDict(this.userId, true, eventIds);
        this.emitUpdateEventDict(dictUpdate);
    }


    //#endregion events

    //#region eventScreenshots
    /**
     * Sends specified imageIds (as available event-screenshots for the active event)
     * to the client.
     * @function
     * @param {Array<ObjectID>} imageIds array of imageIds for screenshots of active event
     */
    emitUpdateEventScreenshotIds(imageIds) {
        //TODO convert object-ids from array to strings, this should not happen implicitly
        this._socket.emit('eventScreenshots/updateScreenshotIds', imageIds);
    }


    //#endregion eventScreenshots


    //#region notifications
    /**
     * Sends (Client-)Notifications to client.
     * @function
     * @param {NotificationsController~ClientNotificationDict} clientNotificationDict notification dict to send
     */
    emitUpdateNotificationDict(clientNotificationDict) {
        //TODO convert object-ids from array to strings, this should not happen implicitly
        this._socket.emit('notifications/updateNotificationDict', clientNotificationDict);
    }


    //#endregion notifications

    //#endregion public
}


module.exports = Client;
