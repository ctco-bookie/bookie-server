import {getAvailability} from '../../services/room-availability';

export default async room => await getAvailability(room.email);