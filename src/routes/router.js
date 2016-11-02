import koaRouter from 'koa-router';
import {
  get as getCalendar,
  getAll as getCalendars
} from './calendar.js';
import {getAll as getRooms} from './rooms.js';

const router = koaRouter();

router.get('/calendar/:id', getCalendar);
router.get('/calendars/:id', getCalendars);
router.get('/rooms', getRooms);

export default router;
