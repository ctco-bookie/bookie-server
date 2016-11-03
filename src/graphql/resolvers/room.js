import Rooms from '../../services/rooms';

const getRoom = async (_, {roomId}) => {
  return Rooms.byId(roomId);
};

const getAllRooms = async () => {
  return Rooms.all();
};

export {
  getRoom,
  getAllRooms
};
