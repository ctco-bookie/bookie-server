import {bookRoom} from '../../services/room-booker';

const booker = async (_, {roomId, bookForMinutes = 15}) => {
  return bookRoom({roomId, bookForMinutes});
};

export {booker}
