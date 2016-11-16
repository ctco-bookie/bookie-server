import Koa from 'koa';
import logger from './middleware/logger';
import errorHandler from './middleware/error-handler';
import cors from './middleware/cors';
import router from './routes/router';

const app = module.exports = new Koa();

app.use(logger);
app.use(cors);
app.use(errorHandler);

router.prefix('/api');
app.use(router.routes());
app.use(router.allowedMethods());

app.context.env = process.env;
