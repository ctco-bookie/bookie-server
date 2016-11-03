import {bookRoom} from '../../services/room-booker';

const resolveRoomBooking = async (_, {roomNumber, bookForMinutes = 15}) => {
  return bookRoom({roomNumber, bookForMinutes});
};

export {resolveRoomBooking}
