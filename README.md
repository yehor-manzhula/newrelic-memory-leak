# How to run a project

## Prepare everything
1. Install project dependencies `npm install`
2. Create a file for newrelic credentials in project root `touch ./newrelic-credentials.sh` 
3. Fill `newrelic-credentials.sh` file with the content, filling with appropriate newrelic values
```
#!/usr/bin/env bash
export NEW_RELIC_APP_NAME=<YOUR_APP_NAME>
export NEW_RELIC_LICENSE_KEY=<YOUR_LICENCE_KEY>
```

## Run project
Run `./run.sh ./src/aws-sdk-gc.js`

### Generate heapdump
To generate heapdump `kill -USR2 ${APPLICATION_PID}`