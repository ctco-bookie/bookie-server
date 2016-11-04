import test from 'ava';
import moment from 'moment';
import {createICal} from './event-generator';

test('createICal:should create calendar', t => {
  const iCal = createICal({
    start: moment(),
    end: moment().add(15, 'minutes'),
    organizerName: 'John Smith',
    organizerEmail: 'john.smith@example.com',
    calendarName: 'No reply',
    calendarEmail: 'noreply@example.com'
  });
  const iCalMessage = iCal.toString();
  t.true(iCalMessage.indexOf('ORGANIZER;CN="John Smith":mailto:john.smith@example.com') > 0);
  t.true(iCalMessage.indexOf('ATTENDEE;ROLE=REQ-PARTICIPANT;CN="No reply":MAILTO:noreply@example.com') > 0);
});

