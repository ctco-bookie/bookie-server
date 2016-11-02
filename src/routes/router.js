import koaRouter from 'koa-router';
import {
  get as getCalendar,
  getAll as getCalendars
} from './calendar.js';
import {getAll as getRooms} from './rooms.js';

const router = koaRouter();

router.get('/calendar/:email', getCalendar);
router.get('/calendars/:email', getCalendars);
router.get('/rooms', getRooms);

export default router;
