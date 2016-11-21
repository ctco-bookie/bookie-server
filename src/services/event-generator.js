import ical from 'ical-generator';

const createICal = ({
  start,
  end,
  organizerName,
  organizerEmail,
  calendarName,
  calendarEmail}) => {
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
            name: calendarName,
            email: calendarEmail
          }
        ]
      }
    ]
  });
  return cal.toString();
};

export {createICal}
