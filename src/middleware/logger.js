'use strict';
const Morgan = require('koa-morgan');

const logger = Morgan('combined');

module.exports = logger;