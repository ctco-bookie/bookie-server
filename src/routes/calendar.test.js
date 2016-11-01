import test from 'ava';
import moment from 'moment';
import {getCalendarName, todayEvent} from './calendar';
import CalendarEvent from './calendar-event';

test('getCalendarName:should parse the name of the calendar', t => {
  t.is(getCalendarName('room.test@foo.bar'), 'test');
});


test('todayEvent:should check for today\'s events', t => {
  const now = moment();
  const yesterday = moment().subtract(1, 'day');
  const
    e1 = new CalendarEvent();
  e1.start = yesterday.subtract(1, 'hour').toDate();
  e1.end = yesterday.subtract(1, 'hour').toDate();
  const e2 = new CalendarEvent();
  e2.start = now.subtract(1, 'hour').toDate();
  e2.end = now.subtract(1, 'hour').toDate();

  t.is(todayEvent(now)(e1), false);
  t.is(todayEvent(now)(e2), true);
});
