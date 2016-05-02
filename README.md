# Battlecat Poll

Simple poll mobile web app for sending data to a Splunk HTTP input. It allows people to answer simple multiple-choice
questions on their mobile phone and have the results be displayed in a Splunk dashboard in real-time. 

## Build/Deploy

1) Update enviroment variables in build.sh

Change the environment variables to match your environment and configuration of the Splunk HTTP input.

```
# Hostname of the Splunk server with the HTTP input enabled
export PP_SPLUNK_HOST=localhost
# Port of the Splunk HTTP input
export PP_SPLUNK_PORT=8088
# `true` if SSL is enabled for the Splunk HTTP input
export PP_SPLUNK_SSL=false
# Splunk HTTP input token
export PP_SPLUNK_TOKEN=C0FFEE11-CAFE-CAFE-CAFE-C0FFEEC0FF33
```

For Splunk setup see below.

2) Build the mobile ap

Run `build.sh` in the source directory.

```
$ sh build.sh
```

Then run the webpack build:

```
PP_SPLUNK_TOKEN=cafecafecafecafe \
PP_SPLUNK_HOST=my.host.com \
./node_modules/webpack/bin/webpack.js -p
```

This generates all the page, JS and all the static content in the `dist` directory. Simply
copy it to a webserver-exposed folder.

## Use the app

Direct users to navigate to the URL of your webserver and have them answer the numbered questions. Each interaction wil 
send a new event to Splunk.

It's also optionally possible to specify the name of the poll (subject) and the number of questions as URL parameters:

```
http://my.webserver.com/poll?subject=Test%20Poll&count=12
```

## Splunk Setup

To enable the splunk HTTP Event Collector and create a token follow the instructions posted here:
	
http://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector 


Once you have your token make sure you update your `PP_SPLUNK_TOKEN` in the previous section.

Parallel Piper makes use of cross-origin resource sharing which requires you to enable CORS on the HTTP event collector.  

To do this edit your `$SPLUNK_HOME/etc/system/local/server.conf` and add the following.

```
[httpServer]
crossOriginSharingPolicy = *
```

After Splunk 6.4 this setting moved to `$SPLUNK_HOME/etc/system/local/inputs.conf`:

```
[http]
crossOriginSharingPolicy = *
```

If you wish to restrict cors calls to a specific domain replace the asterix with the domain name your are hosting 
Parallel Piper on.

