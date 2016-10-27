'use strict';

require('babel-register')({
  plugins: [
    'transform-async-to-generator',
    'transform-es2015-modules-commonjs'
  ]
});

const app = require('./src/app');

const port = 3000;

app.listen(port, () => console.log(`Koa application listening on port ${port}`));
