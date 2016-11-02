import test from 'ava';
import {createICal} from './event-generator';

test('createICal:should create calendar', t => {
  console.log(createICal);
  const iCal = createICal({
    organizerName: 'John Smith',
    organizerEmail: 'john.smith@example.com',
    bookForMinutes: 15
  });
  const iCalMessage = iCal.toString();
  t.true(iCalMessage.indexOf('John Smith') > 0);
  t.true(iCalMessage.indexOf('Ad-hoc') > 0);
});

