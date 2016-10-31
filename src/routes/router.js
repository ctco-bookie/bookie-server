import koaRouter from 'koa-router';
import {get as getCalendar} from './calendar.js';

const router = koaRouter();

router.get('/calendar/:email', getCalendar);

export default router;
