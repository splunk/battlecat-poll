# Hostname of the Splunk server with the HTTP input enabled
export PP_SPLUNK_HOST=localhost
# Port of the Splunk HTTP input
export PP_SPLUNK_PORT=8088
# `true` if SSL is enabled for the Splunk HTTP input
export PP_SPLUNK_SSL=false
# Splunk HTTP input token
export PP_SPLUNK_TOKEN=C0FFEE11-CAFE-CAFE-CAFE-C0FFEEC0FF33

npm install

rm -rf dist/*


./node_modules/webpack/bin/webpack.js -p --progress
