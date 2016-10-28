import koaRouter from 'koa-router';
import {delay}  from 'bluebird';

const router = koaRouter();

router.get('/', ctx => {
  ctx.body = 'Hello, world';
});

router.get('/deferred', async ctx => {
  await delay(3000);
  ctx.body = 'Hello, world after 3 seconds';
});

router.get('/deferred/:timeout', async ctx => {
  const timeout = ctx.params.timeout;
  await delay(timeout * 1000);
  ctx.body = `Hello, world after ${timeout} seconds`;
});

router.get('/echo/:message', ctx => {
  ctx.body = ctx.params.message;
});

router.get('/secret', ctx => {
  ctx.body = process.env.BOOKIE_SECRET;
});

router.post('/echo', ctx => {
  ctx.body = ctx.request.body;
});

router.get('/error', () => {
  throw new Error('Something went wrong!');
});

export default router;
