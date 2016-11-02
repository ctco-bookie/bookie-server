import {createMeeting} from '../services/meeting-booker';
import {
  resolveRooms,
  resolveRoom
} from '../resolvers/rooms';

export const get = async ctx => {
  ctx.body = await resolveRoom(null, ctx.params.id);
};

export const getAll = async ctx => {
  ctx.body = await resolveRooms(null, ctx.params.id);
};

export const book = async ctx => {
  await createMeeting(ctx.params.id);
  ctx.body = {
    success: true,
    message: 'Room booked for 15 minutes'
  };
};
