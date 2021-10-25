# Configuration

The backend and client must be configured via environment variables. Some configuration-properties are mandatory and must be set to a correct/valid value, others are optional.

## Backend

All available configuration-properties are described directly inside the `config.js` file or in [Backend Code/config](Backend_code/config) (generated from source).

To configure the backend you need to edit the environment variables in your `docker-compose.yml`:

```yaml
services:
  # ...
  table-backend:
    # ...
    environment:
      # ...
      TABLE_ADMIN_PASSWORD: YOU_MUST_CHANGE_THIS_VALUE # change this to a long secret phrase
      TABLE_BASE_URL: https://table.example.com # url to client
      TABLE_DB_URL: mongodb://mongo:27017 # url to mongo instance
      TABLE_LDAP_URL: ldaps://ldap.example.com:636 # url to ldap server
      TABLE_LDAP_DN: uid=example,ou=example,dc=example,dc=com # login to search account
      TABLE_LDAP_PASSWORD: 12345678 # login to search account
      TABLE_LDAP_BASE: ou=people,dc=example,dc=com
      TABLE_MAIL_HOST: mailserver.example.com # mail-server
      TABLE_MAIL_FROM: no-reply@table.example.com # email address for automatic mails / notifications
      TABLE_SESSION_TOKEN_PRIVATE_KEY: secret-token-for-encryption # set this to a random value
```


## (Web-)Client

All available configuration-properties are described directly inside the `config.js` file or in [Client Code/config](Client_code/config) (generated from source).

To configure the backend you need to edit the environment variables in your `docker-compose.yml`:

```yaml
services:
  # ...
  table-client:
    # ...
    environment:
      # ...
      TABLE_API_URL: https://table-api.example.com # full url to backend
      TABLE_HTML_CONTACT_INFOS: |
        <p><strong>My Name</strong><br />Address and Tel-Nr.</p>
      TABLE_HTML_TERMS_OF_SERVICE: |
        <h2>lorem ipsum<h2>
        <p>lorem ipsum</p>
```
