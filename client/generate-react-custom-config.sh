#!/bin/sh

printf 'window.customConfig = {};\n'
$CONFIG | while IFS='=' read -r name value; do
    printf 'window.customConfig.%s="%s";\n' "$name" "$value"
done