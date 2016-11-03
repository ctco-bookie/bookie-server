import Rooms from '../../services/rooms';

const resolveRoom = async(_, {roomNumber}) => {
  return Rooms.byNumber(roomNumber);
};

const resolveRooms = async(_, {floorMasterRoomNumber}) => {
  let rooms;

  if (floorMasterRoomNumber) {
    const master = Rooms.byNumber(floorMasterRoomNumber);
    if (!master) {
      return []
    }
    rooms = Rooms.byFloor(master.floor)
                 .filter(room => room.number !== master.number);
  } else {
    rooms = Rooms.all();
  }

  return rooms;
};

export {
  resolveRoom,
  resolveRooms
};
