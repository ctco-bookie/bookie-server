import test from 'ava';
import moment from 'moment';
import {roundToNext15Minutes, bookedForDuration, isBookable} from './room-booker';

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

test('bookedForDuration: should format', t => {
  const start = moment();
  const end = moment().add(27, 'minutes');
  t.is(bookedForDuration(start, end), '27 minutes')
});


test('isBookable: busy room', t => {
  t.false(isBookable({busy: true}, moment()));
});

test('isBookable: free till end of the day', t => {
  t.true(isBookable({busy: false, availableForDuration: null}, moment()));
});

test('isBookable: free but will be busy soon', t => {
  const end = moment().add(20, 'minutes');
  t.false(isBookable({busy: false, availableForDuration: moment.duration(15, 'minutes')}, end));
});

test('isBookable: free and will be free', t => {
  const end = moment().add(20, 'minutes');
  t.true(isBookable({busy: false, availableForDuration: moment.duration(25, 'minutes')}, end));
});
