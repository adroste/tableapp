#!/bin/sh

/generate-react-custom-config.sh > /usr/share/nginx/html/custom-config.js
exec "$@"