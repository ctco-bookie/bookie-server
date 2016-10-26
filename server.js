'use strict';

const app = require('./src/app');

const port = 3000;

app.listen(port, () => console.log(`Koa application listening on port ${port}`));
