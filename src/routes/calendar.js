import {promisify}  from 'bluebird';
import request from 'request';
import CalendarDetails from './calendar-details';

export async function get(ctx) {
  const calendarName = ctx.params.email;
  const ical = await promisify(request)(process.env.CALENDAR_HOST.replace('${calendarName}', calendarName));
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
