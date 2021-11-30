"use strict";

const config = require('./config');
const utils = require('./utils');


function commentOnEntry(name, sender, eventName, data, notificationId) {
    const link = utils.pathJoin(config.TABLE_BASE_URL, data.eventId, data.entryId + `?nId=${notificationId}#${data.commentId}`);
    return {
        subject: `[table] Neuer Kommentar auf Eintrag - ${eventName}`,
        html: 
`Hallo ${name},
<br/><br/>
${sender || 'Jemand'} hat in table in der Veranstaltung \"${eventName}\" einen Eintrag kommentiert, dem du folgst.
<br/><br/>
Klicke auf folgenden Link, um direkt zu dem Eintrag zu gelangen:
<br/>
<a href=\"${link}\">${link}</a>
<br/><br/>
Klicke <a href=\"${config.TABLE_BASE_URL}settings\">hier</a>, um die Benachrichtigungseinstellungen anzupassen.
<br/><br/>
== table - talk about lecture ==
`,
    };
}
exports.commentOnEntry = commentOnEntry;


function replyOnComment(name, sender, eventName, data, notificationId) {
    const link = utils.pathJoin(config.TABLE_BASE_URL, data.eventId, data.entryId + `?nId=${notificationId}#${data.commentId}`);
    return {
        subject: `[table] Neue Antwort auf deinen Kommentar - ${eventName}`,
        html: 
`Hallo ${name},
<br/><br/>
${sender || 'Jemand'} hat in table in der Veranstaltung \"${eventName}\" auf deinen Kommentar geantwortet.
<br/><br/>
Klicke auf folgenden Link, um direkt zu dem Eintrag zu gelangen:
<br/>
<a href=\"${link}\">${link}</a>
<br/><br/>
Klicke <a href=\"${config.TABLE_BASE_URL}settings\">hier</a>, um die Benachrichtigungseinstellungen anzupassen.
<br/><br/>
== table - talk about lecture ==
`,
    };
}
exports.replyOnComment = replyOnComment;


function newEntry(name, sender, eventName, data, notificationId) {
    const link = utils.pathJoin(config.TABLE_BASE_URL, data.eventId, data.entryId + `?nId=${notificationId}`);
    return {
        subject: `[table] Neuer Eintrag - ${eventName}`,
        html: 
`Hallo ${name},
<br/><br/>
${sender || 'Jemand'} hat in table in der Veranstaltung \"${eventName}\" einen neuen Eintrag verfasst.
<br/><br/>
Klicke auf folgenden Link, um direkt zu dem Eintrag zu gelangen:
<br/>
<a href=\"${link}\">${link}</a>
<br/><br/>
Klicke <a href=\"${config.TABLE_BASE_URL}settings\">hier</a>, um die Benachrichtigungseinstellungen anzupassen.
<br/><br/>
== table - talk about lecture ==
`,
    };
}
exports.newEntry = newEntry;