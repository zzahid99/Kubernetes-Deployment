#!/bin/sh -eu
if [ -z "${BRAND:-}" ]; then
    BRAND_JSON=undefined
else
    BRAND_JSON=$(jq -n --arg brand '$BRAND' '$brand')
fi
 
cat <<EOF
window.REACT_APP_BRAND=$BRAND_JSON;
EOF

