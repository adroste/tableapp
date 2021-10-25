// customConfig consists of all values of the process environment
// that start with the prefix "TABLE_"
const customConfig = Object.keys(process.env)
    .filter(key => key.startsWith('TABLE_'))    
    .reduce((customConfig, key) => {
        customConfig[key] = process.env[key];
        return customConfig;
    }, {});

/**
 * Configuration values.
 * IMPORTANT: Only string values are supported!
 */
const config = {
    /**
     * Passwort for access of (super) admin functions.
     * Should be totally secret!
     * Requires overwrite.
     * @type {string}
     */
    TABLE_ADMIN_PASSWORD: 'debug',
    /**
     * Logging-Level.
     * Valid values: 'debug', 'info', 'warn', 'error'.
     * Defaults to 'debug'.
     * @type {string}
     */
    TABLE_LOG_LEVEL: 'debug',
    /**
     * Base-URL of client. Needs to end with a slash.
     * Requires overwrite.
     * @type {string}
     */
    TABLE_BASE_URL: 'https://localhost:3000/',
    
    /**
     * Path to ssl-certificate.
     * Requires overwrite.
     * @type {string}
     */
    TABLE_SSL_CERT_PATH: './localhost.crt',
    /**
     * Path to ssl-certificates private key.
     * Requires overwrite.
     * @type {string}
     */
    TABLE_SSL_KEY_PATH: './localhost.key',

    /**
     * URL to LDAP-Server.
     * Requires overwrite.
     * @type {string}
     */
    TABLE_LDAP_URL: 'ldaps://ldap.example.com:636',
    /**
     * DN of search-account.
     * Requires overwrite.
     * @type {string}
     */
    TABLE_LDAP_DN: 'uid=abc123,...,dc=com',
    /**
     * Password of search-account.
     * Requires overwrite.
     * @type {string}
     */
    TABLE_LDAP_PASSWORD: 'password',
    /**
     * Search-base.
     * Requires overwrite.
     * @type {string}
     */
    TABLE_LDAP_BASE: 'ou=people,dc=example,dc=com',
    /**
     * LDAP entry attributes which are handled as email address.
     * Comma seperated list (e.g. "mail,mailShort,mailAlternative")
     * First entry should be the main attribute.
     * The main attribute is used to send mails to the user.
     * Defaults to 'mail'.
     * @type {string}
     */
    TABLE_LDAP_EMAIL_ATTRIBUTES: 'mail',
    /**
     * LDAP entry attribute which is handled as a persons name.
     * Defaults to 'cn'.
     * @type {string}
     */
    TABLE_LDAP_NAME_ATTRIBUTE: 'cn',
    /**
     * LDAP entry attribute which is handled as a persons title.
     * 
     * This setting is optional: if not set, no title is put in front of persons names.
     * @type {(string|undefined)}
     */
    TABLE_LDAP_TITLE_ATTRIBUTE: undefined,

    /**
     * Name of database to use.
     * Defaults to 'tableapp'.
     * @type {string}
     */
    TABLE_DB_NAME: 'tableapp',
    /**
     * URL to mongodb.
     * Defaults to local mongodb instance on default port.
     * @type {string}
     */
    TABLE_DB_URL: 'mongodb://localhost:27017',

    /**
     * Hostname of mail-server to connect to (via smtp).
     * Defaults to 'localhost'.
     * @type {string}
     */
    TABLE_MAIL_HOST: 'localhost',
    /**
     * Mail-address to send mails from.
     * Requires overwrite.
     * @type {string}
     */
    TABLE_MAIL_FROM: 'table@example.com',

    /**
     * Private key used for signing.
     * Requires overwrite.
     * @type {string}
     */
    TABLE_SESSION_TOKEN_PRIVATE_KEY: 'password',
    /**
     * Time span a sessionToken is valid after creation.
     * Defaults to '180d' (180 days).
     * 
     * Value is expressed in seconds or a string describing a time span. Eg: 60, "2 days", "10h", "7d"
     * @type {string}
     */
    TABLE_SESSION_TOKEN_VALID_FOR: '180d',

    /**
     * Time in minutes to keep screenshots available after last received screenshot/update.
     * Defaults to 15.
     * @type {string}
     */
    TABLE_EVENT_SCREENSHOTS_KEEP_FOR_MINUTES_AFTER_LAST_UPDATE: '15',
    /**
     * Determines how many screenshots should be preserved at a time.
     * Defaults to 3.
     * @type {string}
     */
    TABLE_EVENT_SCREENSHOTS_SAVE_LAST_COUNT: '3',

    ...customConfig
};

module.exports = config;
