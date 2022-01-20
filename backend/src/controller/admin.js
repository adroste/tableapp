"use strict";

const db = require('../db').db;
const utils = require('../utils');
const broker = require('../broker');
const config = require('../config');
const mail = require('../mail');
const PermissionLevelEnum = require('../PermissionLevelEnum');


/**
 * Controller for admin access.
 * @module adminController
 */


// --------- Public ---------

/**
 * Checks the admin password
 * @static
 * @async
 * @function
 * @param {string} password password to check
 * @returns {Promise<boolean>} resolves to true or false
 */
async function checkAdminPassword(password) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return config.TABLE_ADMIN_PASSWORD === password;
}
exports.checkAdminPassword = checkAdminPassword;


/**
 * Insert new event into db.
 * @static
 * @async
 * @function
 * @param {string} userId userId of event administrator
 * @param {string} title title of event
 * @param {(ObjectID|null)} customId custom id of event. null will generate a new id
 * @returns {Promise<ObjectID>} resolves to ObjectID of inserted event
 */
async function createNewEvent(userId, title, customId) {
    const res = await db().collection('events').insertOne({
        _id: customId || undefined,
        roles: [
            {
                "id": "1",
                "color": "violet",
                "name": "Dozent"
            },
            {
                "id": "2",
                "name": "Übungsleiter",
                "color": "blue"
            },
            {
                "id": "3",
                "name": "Tutor",
                "color": "green"
            }
        ],
        isArchived: false,
        name: title,
        users: {
            [userId]: {
                permissionLevel: PermissionLevelEnum.ADMINISTRATOR,
            }
        }
    });

    if (res.insertedCount < 1)
        throw utils.createError('event could not get created');
    
    broker.handleEventUpdated(res.insertedId);
    return res.insertedId;
}
exports.createNewEvent = createNewEvent;


/**
 * Send a test email
 * @static
 * @async
 * @function
 * @param {string} email email to send to
 * @returns {Promise<boolean>} resolves to true or false
 */
async function sendTestEmail(email) {
    return mail.sendMail(email, 'Table Test Mail', '<p>This is a Test</p>');
}
exports.sendTestEmail = sendTestEmail;