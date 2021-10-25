# Deployment

## Prerequisites

* Install docker and docker-compose.
* Create a LDAP Account with search permissions on your ldap server
* configure the mail-server (either localhost or an open mail-server in the network)

## Docker-compose

There is a prepared [docker-compose.yml (here)](https://github.com/adroste/tableapp/blob/master/docker-compose.yml) in the root of the repo.

It sets up:
* MongoDB database
* Table backend
* Table client (frontend)
* nginx reverse proxy
* automatic ssl certificate generation
* automatic ssl certificate renewal

Usage:
1. Copy the [docker-compose.yml](https://github.com/adroste/tableapp/blob/master/docker-compose.yml) to a writable local folder on your server/machine.
2. Open the file and edit all the necessary configuration values (e.g. your domain). See: [Configuration](configuration.md). 
3. Execute `docker-compose up -d`.

Stopping: `docker-compose down`

### nginx-proxy

The docker-compose uses nginx-proxy and acme-companion for easy SSL and automatic letsencrypt certificates.
Under environment for table-backend and table-client you must set the `VIRTUAL_HOST` as well as `VIRTUAL_PORT` variables. The `VIRTUAL_PORT` are 4898 (backend) and 80 (client). The `VIRTUAL_HOST` must be your domain, e.g. `api.example.com` and `app.example.com`. Letsencrypt will create certificates for these domains.

### How-To run frontend and backend on same domain but different subpaths

As of 2021-10-20 the dev build of nginx-proxy supports the VIRTUAL_PATH directive. The following incomplete example, demonstrates its usage. 

```yaml
services:
  table-backend:
    environment:
      VIRTUAL_HOST: table.example.com
      VIRTUAL_PATH: /api/
      VIRTUAL_PORT: 4898
      TABLE_BASE_URL: https://table.example.com

  table-client:
    environment:
      VIRTUAL_HOST: table.example.com
      VIRTUAL_PATH: /
      VIRTUAL_PORT: 80
      TABLE_API_URL: https://table.example.com/api/

  nginx-proxy:
    # as of 2021-10-20 path based routing is only supported for the "dev"-images
    # see: https://github.com/nginx-proxy/nginx-proxy/pull/1607 
    image: nginxproxy/nginx-proxy:dev
```