"use strict";

// load environment from .env file
require('dotenv').config();

require('./console');
const broker = require('./broker');
const config = require('./config');
const db = require('./db');
const dbVersionMigrationController = require('./controller/dbVersionMigration');
const fs = require('fs');
const mail = require('./mail');
const path = require('path');
const utils = require('./utils');

console.log(`Starting TABLE Backend - Version: ${utils.getAppVersion()}`);

// top-level async function that never rejects
(async () => {

    if (utils.isAppInDevelopmentMode())
        console.warn('launching in development/debug mode');

    if (await mail.testConnection()) {
        console.log('Mailserver connected');
    } else {
        console.error('Could not connect to mailserver');
        process.exit();
        return;
    }

    await db.connect();
    await dbVersionMigrationController.checkAndUpdateVersion();

    // init webserver after db connected & checked
    const httpsServer = require('https').createServer({
        cert: fs.readFileSync(path.resolve(config.TABLE_SSL_CERT_PATH)),
        key: fs.readFileSync(path.resolve(config.TABLE_SSL_KEY_PATH)),
    });
    const io = require('socket.io')(httpsServer);

    // setup connection handler of (client-)broker
    io.on('connection', (socket) => broker.handleConnection(socket));

    httpsServer.listen(4898, () => {
        console.info('http server listening on port 4898');
    });

})().catch(e => {
    // catch all top level errors
    console.error(e);
    process.exit();
});
