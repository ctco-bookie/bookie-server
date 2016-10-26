'use strict';
const Koa = require('koa');

const app = module.exports = new Koa();

app.use(require('./middleware/logger'));
app.use(require('./middleware/error-handler'));

const router = require('./routes/router');
app.use(router.routes());
app.use(router.allowedMethods());