# Development

## Prerequisites 

#### Tools 

Install the following tools:

* docker
* docker-compose
* make

## Backend, Web-Client, Database

1. pull project from git
2. `cd` in root-folder (./tableapp)
3. run `make dev` to start the development containers in docker using docker-compose

The Makefile also offers options to run the shell in the backend and client container or to build the containers.

In order to run a project you need to install the dependencies (node_modules). This can be done by *`cd`-ing* into the project directory (`client`, `backend` or `client_desktop`). Each directory must include a file called `package.json`.

To install the `node_modules` execute: `yarn install` (inside the project-directory).


## Desktop-Client

Start Backend, Web-Client and Database first. Then run desktop client via electron.

#### Error-Logs / Debugging

User-Logs can be found:

- **on Linux:** `~/.config/<app name>/log.log`
- **on OS X:** `~/Library/Logs/<app name>/log.log`
- **on Windows:** `%USERPROFILE%\AppData\Roaming\<app name>\log.log`