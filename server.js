'use strict';
const envalid = require('envalid');

const {url, str} = envalid;

envalid.cleanEnv(process.env, {
  CALENDAR_HOST: url(),
  CALENDAR_TZ: str()
});

require('babel-register')();

const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Koa application listening on port ${port}`));
