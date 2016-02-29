rm -rf dist/*

export PP_SPLUNK_HOST=localhost
export PP_SPLUNK_PORT=8088
export PP_SPLUNK_SSL=false
export PP_SPLUNK_TOKEN=C0FFEE11-CAFE-CAFE-CAFE-C0FFEEC0FF33

./node_modules/webpack/bin/webpack.js -p --progress
