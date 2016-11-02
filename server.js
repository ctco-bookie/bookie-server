'use strict';
const envalid = require('envalid');

const {url, str, json} = envalid;

envalid.cleanEnv(process.env, {
  CALENDAR_HOST: url(),
  ROOMS: json(),
  CALENDAR_TZ: str()
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
