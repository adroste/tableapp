"use strict";

/**
 * Mail transport.
 * @module mail
 */

const config = require('./config');
const nodemailer = require('nodemailer');


/**
 * Nodemailer-transport instance.
 * @type {MailTransport}
 */
const transporter = nodemailer.createTransport({
    host: config.TABLE_MAIL_HOST,
    port: 25,
    pool: true,
    tls: { 
        rejectUnauthorized: false 
    },
});


/**
 * Send mail.
 * @static
 * @async
 * @function
 * @param {string} to e-mail address to send to
 * @param {string} subject subject of mail
 * @param {string} html html-body of mail
 * @returns {Promise} never rejects, errors will be catched and printed
 */
async function sendMail(to, subject, html) {
    console.debug(`MAIL\t${"send".padEnd(20)}\t${to}\t${subject}`);
    // ignore return value
    try {
        const res = await transporter.sendMail({
            from: config.TABLE_MAIL_FROM,
            to,
            subject,
            html
        });
        console.debug(`MAIL\t${"sendResult".padEnd(20)}\t${JSON.stringify(res)}`);
    } catch (e) {
        console.error(e);
    }
}
exports.sendMail = sendMail;


/**
 * Tests connection to mailserver.
 * @static
 * @async
 * @function
 * @returns {Promise<boolean>} resolves to true if successful, false otherwise
 */
async function testConnection() {
    try {
        await transporter.verify();
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
exports.testConnection = testConnection;
