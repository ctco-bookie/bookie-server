import ical from 'ical-generator';
import moment from 'moment';

export const createICal = ({organizerName, organizerEmail, bookForMinutes}) => {
  const cal = ical({
    events: [
      {
        start: moment().toDate(),
        end: moment().add(bookForMinutes, 'minute').toDate(),
        summary: 'Ad-hoc',
        method: 'REQUEST',
        organizer: {
          name: organizerName,
          email: organizerEmail
        }
      }
    ]
  });
  return cal.toString();
};
