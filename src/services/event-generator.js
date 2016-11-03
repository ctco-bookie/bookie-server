import ical from 'ical-generator';

export const createICal = ({start, end, organizerName, organizerEmail}) => {
  const cal = ical({
    events: [
      {
        start: start.toDate(),
        end: end.toDate(),
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
