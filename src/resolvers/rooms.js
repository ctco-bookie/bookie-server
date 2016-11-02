import {all} from 'bluebird';
import {getCalendar} from '../services/calendar';
import _ from 'lodash';
import Rooms from '../services/rooms'

const resolveRooms = async (root, {id}) => {
  const masterRoom = Rooms.byId(id);

  const roomsOnTheSameFloor = Rooms.byFloor(masterRoom.floor);

  const calendars = await all(
    roomsOnTheSameFloor.map(room => room.email)
                       .map(getCalendar)
  );

  const masterCalendar = _.find(calendars, calendar => calendar.email.toLowerCase() === masterRoom.email.toLowerCase());
  if (masterCalendar) {
    masterCalendar.master = true;
  }
  return calendars.filter(calendar => calendar.master || !calendar.busy);
};

const resolveRoom = async (root, {id}) => {
  const room = Rooms.byId(id);

  return await getCalendar(room.email);
};

export {
  resolveRooms,
  resolveRoom
};
