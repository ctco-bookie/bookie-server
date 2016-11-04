import Rooms from '../../services/rooms';

export default async(_, {floorMasterRoomNumber}) => {
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