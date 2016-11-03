import {getAvailability} from '../../services/room-availability';

const resolveAvailability = async room => {
  return await getAvailability(room.email);
};

export {
  resolveAvailability
};
