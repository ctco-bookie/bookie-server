import {all} from 'bluebird';
import {getCalendar} from '../services/calendar';
import Rooms from '../services/rooms';
import _ from 'lodash';

export const get = async ctx => {
  const calendarName = ctx.params.email;
  ctx.body = await getCalendar(calendarName);
};

export const getAll = async ctx => {
  const roomEmail = ctx.params.email;
  const room = Rooms.byEmail(roomEmail);
  const roomsOnTheSameFloor = Rooms.byFloor(room.floor);

  const calendars = await all(
    roomsOnTheSameFloor.map(room => room.email)
                       .map(getCalendar)
  );

  const masterCalendar = _.find(calendars, calendar => calendar.email.toLowerCase() === roomEmail.toLowerCase());
  if (masterCalendar) {
    masterCalendar.master = true;
  }

  ctx.body = calendars.filter(calendar => calendar.master || !calendar.busy);
};
