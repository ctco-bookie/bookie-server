import {promisify} from 'bluebird';
import request from 'request';
import CalendarDetails from './calendar-details';

export const get = async ctx => {
  const calendarName = ctx.params.email;
  const {body: iCal} = await promisify(request)(ctx.env.CALENDAR_HOST.replace('${calendarName}', calendarName));

  ctx.body = new CalendarDetails(
    getCalendarName(calendarName),
    isBusy(calendarName)
  );
};

export const getCalendarName = email => {
  const [name, ] = email.split("@");
  const [room, roomName, ] = name.split(".");

  return roomName;
};

const isBusy = email => {
  return email.indexOf('arkanoid') !== -1;
};
