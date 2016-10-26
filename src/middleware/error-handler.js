const Promise = require('bluebird');
const co = Promise.coroutine;

const errorHandler = (ctx, next) => {
	return co(function *() {
		try {
			yield next();
		} catch (err) {
			if (err == null) {
				err = new Error('Null or undefined error');
			}
			// some errors will have .status
			// however this is not a guarantee
			ctx.status = err.status || 500;
			ctx.type = 'application/json';
			ctx.body = JSON.stringify({
				success: false,
				message: err.stack
			});

			// since we handled this manually we'll
			// want to delegate to the regular app
			// level error handling as well so that
			// centralized still functions correctly.
			ctx.app.emit('error', err, this);
		}
	})();
};

module.exports = errorHandler;