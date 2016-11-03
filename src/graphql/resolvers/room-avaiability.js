import {all} from 'bluebird';
import {getAvailability} from '../../services/room-availability';
import Rooms from '../../services/rooms';

const roomAvailabilityWithFloorOptions = async (_, {roomId}) => {
  const masterRoom = Rooms.byId(roomId);
  if (!masterRoom) {
    return [];
  }

  const mailAddressesByFloor = Rooms.byFloor(masterRoom.floor)
                                    .map(room => room.email);

  const availabilities = await all(mailAddressesByFloor.map(getAvailability));

  const masterAvailability = availabilities.find(availability => availability.email.toLowerCase() === masterRoom.email.toLowerCase());
  if (masterAvailability) {
    masterAvailability.master = true;
  }
  return availabilities.filter(availability => availability.master || !availability.busy)
                       .map(availability => Object.assign({}, availability, Rooms.byEmail(availability.email)))
                       .sort((a, b) => a.number - b.number);
};

const roomAvailability = async (_, {roomId}) => {
  const room = Rooms.byId(roomId);
  if (!room) {
    return {};
  }

  const roomAvailability = await getAvailability(room.email);
  return Object.assign({}, roomAvailability, room);
};

export {
  roomAvailabilityWithFloorOptions,
  roomAvailability
};
