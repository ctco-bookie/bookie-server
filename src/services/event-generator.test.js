import test from 'ava';
import moment from 'moment';
import {createICal} from './event-generator';

test('createICal:should create calendar', t => {
  const iCal = createICal({
    start: moment(),
    end: moment().add(15, 'minutes'),
    organizerName: 'John Smith',
    organizerEmail: 'john.smith@example.com'
  });
  const iCalMessage = iCal.toString();
  t.true(iCalMessage.indexOf('John Smith') > 0);
  t.true(iCalMessage.indexOf('Ad-hoc') > 0);
});

