const Promise = require('bluebird');
const co = Promise.coroutine;

const router = require('koa-router')();

router.get('/', (ctx) => {
	ctx.status = 200;
	ctx.body = 'Hello, world';
});

router.get('/api/deferred', (ctx) => {
	return co(function *() {
		yield Promise.delay(3000);
		ctx.response.body = 'Hello, world after 3 seconds';
	})();
});

router.get('/api/error', () => {
	throw new Error('Something went wrong!');
});

module.exports = router;