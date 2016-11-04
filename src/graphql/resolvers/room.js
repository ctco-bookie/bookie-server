import Rooms from '../../services/rooms';

export default async(_, {roomNumber}) => Rooms.byNumber(roomNumber);
