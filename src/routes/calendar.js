import {promisify} from 'bluebird';
import request from 'request';
import CalendarDetails from './calendar-details';

export const get = async(ctx) => {
  const calendarName = ctx.params.email;
  const {body: iCal} = await promisify(request)(process.env.CALENDAR_HOST.replace('${calendarName}', calendarName));

  ctx.body = new CalendarDetails(
    getCalendarName(calendarName, iCal),
    isBusy(calendarName, iCal)
  );
};

function getCalendarName(email, iCalData) {
  const [name, ] = email.split("@");
  const [room, roomName, ] = name.split(".");

  return roomName;
}

function isBusy(email, iCalData) {
  return email.indexOf('arkanoid') !== -1;
}
