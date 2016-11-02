import {all} from 'bluebird';
import {getCalendar} from '../services/calendar';
import Rooms from '../services/rooms';

moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 30);
moment.relativeTimeThreshold('M', 12);

export const get = async ctx => {
  const calendarName = ctx.params.email;
  ctx.body = await getCalendar(calendarName);
};

export const getAll = async ctx => {
  const roomEmail = ctx.params.email;
  const room = Rooms.byEmail(roomEmail);
  const roomsOnTheSameFloor = Rooms.byFloor(room.floor);

  ctx.body = await all(
    roomsOnTheSameFloor.map(room => room.email)
                       .map(getCalendar)
  ).filter(calendar => !calendar.busy);
};
