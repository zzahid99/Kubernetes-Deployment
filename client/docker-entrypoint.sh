#!/bin/sh -eu
echo $BRAND
sed -e "s|testurl|$BRAND|g" /usr/share/nginx/html/config.js
nginx -g "daemon off;"