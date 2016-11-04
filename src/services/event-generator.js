import ical from 'ical-generator';

export const createICal = ({start, end, organizerName, organizerEmail, calendarEmail}) => {
  const cal = ical({
    events: [
      {
        start: start.toDate(),
        end: end.toDate(),
        summary: 'Ad-hoc',
        method: 'request',
        organizer: {
          name: organizerName,
          email: organizerEmail
        },
        attendees: [
          {
            name: calendarEmail,
            email: calendarEmail
          }
        ]
      }
    ]
  });
  return cal.toString();
};
