import koaRouter from 'koa-router';
import {delay}  from 'bluebird';

const router = koaRouter();

router.get('/', async ctx => {
  ctx.status = 200;
  ctx.body = 'Hello, world';
});

router.get('/api/deferred', async ctx => {
  await delay(3000);
  ctx.response.body = 'Hello, world after 3 seconds';
});

router.get('/api/error', async () => {
  throw new Error('Something went wrong!');
});

export default router;
