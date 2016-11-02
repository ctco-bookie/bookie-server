'use strict';
const envalid = require('envalid');

const {url, json, str, email} = envalid;

envalid.cleanEnv(process.env, {
  CALENDAR_HOST: url(),
  ROOMS: json(),
  MAIL_HOST: str(),
  MEETING_ORGANIZER: str(),
  MEETING_ORGANIZER_EMAIL: email()
});

require('babel-register')();

require('dotenv').config({silent: true});

require('babel-register')({
  plugins: [
    'transform-async-to-generator',
    'transform-es2015-modules-commonjs'
  ]
});

const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Koa application listening on port ${port}`));
