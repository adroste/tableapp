<a id="config"></a>

## config
Configuration values.
IMPORTANT: Only string values are supported!

**Kind**: global constant  

* [config](#config)
    * [.TABLE_ADMIN_PASSWORD](#config46table95admin95password) : <code>string</code>
    * [.TABLE_LOG_LEVEL](#config46table95log95level) : <code>string</code>
    * [.TABLE_BASE_URL](#config46table95base95url) : <code>string</code>
    * [.TABLE_SSL_CERT_PATH](#config46table95ssl95cert95path) : <code>string</code>
    * [.TABLE_SSL_KEY_PATH](#config46table95ssl95key95path) : <code>string</code>
    * [.TABLE_LDAP_URL](#config46table95ldap95url) : <code>string</code>
    * [.TABLE_LDAP_DN](#config46table95ldap95dn) : <code>string</code>
    * [.TABLE_LDAP_PASSWORD](#config46table95ldap95password) : <code>string</code>
    * [.TABLE_LDAP_BASE](#config46table95ldap95base) : <code>string</code>
    * [.TABLE_LDAP_EMAIL_ATTRIBUTES](#config46table95ldap95email95attributes) : <code>string</code>
    * [.TABLE_LDAP_NAME_ATTRIBUTE](#config46table95ldap95name95attribute) : <code>string</code>
    * [.TABLE_LDAP_TITLE_ATTRIBUTE](#config46table95ldap95title95attribute) : <code>string</code> &#124; <code>undefined</code>
    * [.TABLE_DB_NAME](#config46table95db95name) : <code>string</code>
    * [.TABLE_DB_URL](#config46table95db95url) : <code>string</code>
    * [.TABLE_MAIL_HOST](#config46table95mail95host) : <code>string</code>
    * [.TABLE_MAIL_FROM](#config46table95mail95from) : <code>string</code>
    * [.TABLE_SESSION_TOKEN_PRIVATE_KEY](#config46table95session95token95private95key) : <code>string</code>
    * [.TABLE_SESSION_TOKEN_VALID_FOR](#config46table95session95token95valid95for) : <code>string</code>
    * [.TABLE_EVENT_SCREENSHOTS_KEEP_FOR_MINUTES_AFTER_LAST_UPDATE](#config46table95event95screenshots95keep95for95minutes95after95last95update) : <code>string</code>
    * [.TABLE_EVENT_SCREENSHOTS_SAVE_LAST_COUNT](#config46table95event95screenshots95save95last95count) : <code>string</code>

<a id="config46table95admin95password"></a>

### config.TABLE\_ADMIN\_PASSWORD : <code>string</code>
Passwort for access of (super) admin functions.
Should be totally secret!
Requires overwrite.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95log95level"></a>

### config.TABLE\_LOG\_LEVEL : <code>string</code>
Logging-Level.
Valid values: 'debug', 'info', 'warn', 'error'.
Defaults to 'debug'.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95base95url"></a>

### config.TABLE\_BASE\_URL : <code>string</code>
Base-URL of client. Needs to end with a slash.
Requires overwrite.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95ssl95cert95path"></a>

### config.TABLE\_SSL\_CERT\_PATH : <code>string</code>
Path to ssl-certificate.
Requires overwrite.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95ssl95key95path"></a>

### config.TABLE\_SSL\_KEY\_PATH : <code>string</code>
Path to ssl-certificates private key.
Requires overwrite.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95ldap95url"></a>

### config.TABLE\_LDAP\_URL : <code>string</code>
URL to LDAP-Server.
Requires overwrite.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95ldap95dn"></a>

### config.TABLE\_LDAP\_DN : <code>string</code>
DN of search-account.
Requires overwrite.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95ldap95password"></a>

### config.TABLE\_LDAP\_PASSWORD : <code>string</code>
Password of search-account.
Requires overwrite.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95ldap95base"></a>

### config.TABLE\_LDAP\_BASE : <code>string</code>
Search-base.
Requires overwrite.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95ldap95email95attributes"></a>

### config.TABLE\_LDAP\_EMAIL\_ATTRIBUTES : <code>string</code>
LDAP entry attributes which are handled as email address.
Comma seperated list (e.g. "mail,mailShort,mailAlternative")
First entry should be the main attribute.
The main attribute is used to send mails to the user.
Defaults to 'mail'.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95ldap95name95attribute"></a>

### config.TABLE\_LDAP\_NAME\_ATTRIBUTE : <code>string</code>
LDAP entry attribute which is handled as a persons name.
Defaults to 'cn'.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95ldap95title95attribute"></a>

### config.TABLE\_LDAP\_TITLE\_ATTRIBUTE : <code>string</code> &#124; <code>undefined</code>
LDAP entry attribute which is handled as a persons title.

This setting is optional: if not set, no title is put in front of persons names.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95db95name"></a>

### config.TABLE\_DB\_NAME : <code>string</code>
Name of database to use.
Defaults to 'tableapp'.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95db95url"></a>

### config.TABLE\_DB\_URL : <code>string</code>
URL to mongodb.
Defaults to local mongodb instance on default port.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95mail95host"></a>

### config.TABLE\_MAIL\_HOST : <code>string</code>
Hostname of mail-server to connect to (via smtp).
Defaults to 'localhost'.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95mail95from"></a>

### config.TABLE\_MAIL\_FROM : <code>string</code>
Mail-address to send mails from.
Requires overwrite.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95session95token95private95key"></a>

### config.TABLE\_SESSION\_TOKEN\_PRIVATE\_KEY : <code>string</code>
Private key used for signing.
Requires overwrite.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95session95token95valid95for"></a>

### config.TABLE\_SESSION\_TOKEN\_VALID\_FOR : <code>string</code>
Time span a sessionToken is valid after creation.
Defaults to '180d' (180 days).

Value is expressed in seconds or a string describing a time span. Eg: 60, "2 days", "10h", "7d"

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95event95screenshots95keep95for95minutes95after95last95update"></a>

### config.TABLE\_EVENT\_SCREENSHOTS\_KEEP\_FOR\_MINUTES\_AFTER\_LAST\_UPDATE : <code>string</code>
Time in minutes to keep screenshots available after last received screenshot/update.
Defaults to 15.

**Kind**: static property of [<code>config</code>](#config)  
<a id="config46table95event95screenshots95save95last95count"></a>

### config.TABLE\_EVENT\_SCREENSHOTS\_SAVE\_LAST\_COUNT : <code>string</code>
Determines how many screenshots should be preserved at a time.
Defaults to 3.

**Kind**: static property of [<code>config</code>](#config)  
