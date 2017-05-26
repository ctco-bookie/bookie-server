# Docker

## Before you start

Create `.env` file containing useful variables like this:

```
CALENDAR_HOST=https://mail.company.com/home/${calendarName}/Calendar
ROOMS=[{"name":"Room name","email":"room.name.123@company.com","number":123,"floor":1,"capacity":20}]
MEETING_ORGANIZER=Bookie
MEETING_ORGANIZER_EMAIL=bookie@company.com
MAIL_HOST=mail.company.com
```

## Run for development mode

Run the following:

```
docker-compose up 
```

This will enable development mode - e.g. server will be automatically reloaded once you do any code changes

## Rebuild image

E.g. if you do some changes to `package.json` (that trigger changes to `node_modules` or add any other resources)

```
docker-compose build
```


## Run for production

```
docker-compose -f docker-compose.prod.yml up
```

# Some reading

http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

# Open questions

* `npm install` is run inside the container. So there is no `node_modules` folder on host OS that makes it impossible to use any IDE features related to library code navigation/autocomplete.
Workaround: run `npm install` locally as well to have a *clone* of `node_modules` from container
