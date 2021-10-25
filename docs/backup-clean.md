# Backup / Clean

## mongodump

You can use mongodump to backup the database.

```sh
ssh table # ssh into your server

# make sure all services are running
docker exec -it mongo bash # open a shell to your mongodb container

# inside the mongo container:
> cd /data/db
> mongodump -d tableapp -o db-table-`date +"%y-%m-%d"`/

# back on your local computer, copy over the backup (assuming the location is ~/tableapp-data)
scp -r table:~/tableapp-data/db-table-`date +"%y-%m-%d"` db-table-`date +"%y-%m-%d"`/
```

## remove old events from database

To cleanup everything you can do the following:

```sh
ssh table # ssh into your server

# make sure all services are running
docker exec -it mongo bash # open a shell to your mongodb container

# access the database with name "tableapp" (default database name)
> use tableapp
> db.dropDatabase() # this will clear everything! (users, events, entries etc.)
```
