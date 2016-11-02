import {all} from 'bluebird';
import {getCalendar} from '../services/calendar';
import {createMeeting} from '../services/meeting-booker';
import Rooms from '../services/rooms';
import _ from 'lodash';

export const get = async ctx => {
  const room = Rooms.byId(ctx.params.id);

  ctx.body = await getCalendar(room.email);
};

export const book = async ctx => {
  await createMeeting(ctx.params.id);
  ctx.body = {
    success: true,
    message: 'Room booked for 15 minutes'
  };
};

export const getAll = async ctx => {
  const masterRoom = Rooms.byId(ctx.params.id);

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

