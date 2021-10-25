#!/bin/sh

beginswith() { case $2 in "$1"*) true ;; *) false ;; esac }

printf 'window.customConfig = {};\n'
env | while IFS='=' read -r name value; do
    if beginswith TABLE_ "$name"; then
        printf 'window.customConfig.%s=`%s`;\n' "$name" "$value"
    fi
done