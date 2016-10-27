import koaRouter from 'koa-router';
import {delay}  from 'bluebird';

const router = koaRouter();

router.get('/', async ctx => {
  ctx.body = 'Hello, world';
});

router.get('/deferred', async ctx => {
  await delay(3000);
  ctx.body = 'Hello, world after 3 seconds';
});

router.get('/echo/:message', async ctx => {
  ctx.body = ctx.params.message;
});

router.get('/secret', async ctx => {
  ctx.body = process.env.BOOKIE_SECRET;
});

router.post('/echo', async ctx => {
  ctx.body = ctx.request.body;
});

router.get('/error', async () => {
  throw new Error('Something went wrong!');
});

export default router;
