import koaRouter from 'koa-router';
import {
  get as getCalendar,
  book as book,
  getAll as getCalendars
} from './room-availibility.js';
import graphQl from './graphql.js';

const router = koaRouter();

router.get('/calendar/:roomId', getCalendar);
router.get('/calendars/:roomId', getCalendars);
router.put('/calendar/:id/booking', book);
router.all('/graphql', graphQl);

export default router;
