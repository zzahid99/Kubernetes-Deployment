#!/bin/sh -eu
echo $BRAND
sed -i "s|testurl|$BRAND|g" /usr/share/nginx/html/config.js
cat /usr/share/nginx/html/config.js
nginx -g "daemon off;"