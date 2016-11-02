import koaRouter from 'koa-router';
import {
  get as getCalendar,
  book as book,
  getAll as getCalendars
} from './calendar.js';
import {getAll as getRooms} from './rooms.js';

const router = koaRouter();

router.get('/calendar/:id', getCalendar);
router.get('/calendars/:id', getCalendars);
router.put('/calendar/:id/booking', book);
router.get('/rooms', getRooms);

export default router;
