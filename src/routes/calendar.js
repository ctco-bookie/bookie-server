import {delay}  from 'bluebird';
import axios from 'axios';
import CalendarDetails from './calendar-details';

export async function get(ctx) {
  const calendarName = ctx.params.email;
  const ical = await axios.get(process.env.CALENDAR_HOST.replace('${calendarName}', calendarName), {
    // proxy: {
    //   host: 'gate-zrh.swissre.com',
    //   port: 8080
    // }
  });
  // ctx.body = ical.data;

  ctx.body = new CalendarDetails(getCalendarName(calendarName, ical.data), isBusy(calendarName, ical.data));
}


function getCalendarName(email, iCalData) {
  const [name, ] = email.split("@");
  const [room, roomName, ] = name.split(".");

  return roomName;
}

function isBusy(email, iCalData) {
  return email.indexOf('arkanoid') !== -1;
}
