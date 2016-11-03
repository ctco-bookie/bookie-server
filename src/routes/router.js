import koaRouter from 'koa-router';
import graphQl from './graphql.js';

const router = koaRouter();

router.all('/graphql', graphQl);

export default router;
