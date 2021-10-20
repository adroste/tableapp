#!/bin/sh

if [ "$NODE_ENV" = development ]; then
    echo "DEV / DEBUG mode"
    echo "-------------------------"
    echo "Running npm install ..."
    npm install # make sure to install dev dependencies
fi;

echo "-------------------------"
echo "Starting backend ..."
exec "$@"