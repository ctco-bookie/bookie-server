import {bookRoom} from '../../services/room-booker';

export default async (_, {roomNumber, bookForMinutes = 15}) => bookRoom({roomNumber, bookForMinutes});
