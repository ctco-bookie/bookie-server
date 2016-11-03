import test from 'ava';
import moment from 'moment';
import {roundToNext15Minutes} from './room-booker';

test('roundToNext15Minutes: should round up', t => {
  const next = roundToNext15Minutes(moment('2016-01-01 09:16'));
  t.is(next.hours(), 9);
  t.is(next.minutes(), 30);
});

test('roundToNext15Minutes: should not round up if 15 minutes sharp', t => {
  const next = roundToNext15Minutes(moment('2016-01-01 09:15'));
  t.is(next.hours(), 9);
  t.is(next.minutes(), 15);
});
