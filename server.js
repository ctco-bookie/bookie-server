'use strict';

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
