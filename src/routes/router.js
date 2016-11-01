import koaRouter from 'koa-router';
import {get as getCalendar} from './calendar.js';
import {get as getRooms} from './rooms.js';

const router = koaRouter();

router.get('/calendar/:email', getCalendar);
router.get('/rooms', getRooms);

export default router;
