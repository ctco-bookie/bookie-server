import {all} from 'bluebird';
import {getCalendar} from '../services/calendar';
import Rooms from '../services/rooms';
import _ from 'lodash';

export const get = async ctx => {
  const room = findRoom(ctx.params.id);

  ctx.body = await getCalendar(room.email);
};

export const getAll = async ctx => {
  const masterRoom = findRoom(ctx.params.id);

  const roomsOnTheSameFloor = Rooms.byFloor(masterRoom.floor);

  const calendars = await all(
    roomsOnTheSameFloor.map(room => room.email)
                       .map(getCalendar)
  );

  const masterCalendar = _.find(calendars, calendar => calendar.email.toLowerCase() === masterRoom.email.toLowerCase());
  if (masterCalendar) {
    masterCalendar.master = true;
  }

  ctx.body = calendars.filter(calendar => calendar.master || !calendar.busy);
};

const findRoom = roomId => {
  return isNumeric(roomId) ? Rooms.byNumber(+roomId) : Rooms.byEmail(roomId);
};

const isNumeric = value => {
  if (typeof value === 'number') return true;
  var str = (value || '').toString();
  if (!str) return false;
  return !isNaN(str);
};
