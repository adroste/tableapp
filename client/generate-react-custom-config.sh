#!/bin/sh

printf 'window.customConfig = {};\n'
env | awk -F= '/^TABLE/ {print $1}' | while read line; do
    eval c="\"\$$line\""
    printf 'window.customConfig.%s=`%s`;\n' "$line" "$c"
done