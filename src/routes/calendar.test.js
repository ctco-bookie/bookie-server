import test from 'ava';
import {getCalendarName} from './calendar';

test('getCalendarName:should parse the name of the calendar', t => {
  t.is(getCalendarName('room.test@foo.bar'), 'test');
});
