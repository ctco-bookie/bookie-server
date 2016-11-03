import {bookRoom} from '../../services/room-booker';

const booker = async (_, args) => {
  await bookRoom(args);
  return {
    success: true,
    message: 'Room booked for 15 minutes'
  };
};

export {booker}
