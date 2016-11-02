import {bookRoom} from '../services/room-booker';
import {
  roomAvailabilityWithFloorOptions,
  roomAvailability
} from '../graphql/resolvers/room-avaiability';

export const get = async ctx => {
  ctx.body = await roomAvailability(null, ctx.params);
};

export const getAll = async ctx => {
  ctx.body = await roomAvailabilityWithFloorOptions(null, ctx.params);
};

export const book = async ctx => {
  await bookRoom(ctx.params.id);
  ctx.body = {
    success: true,
    message: 'Room booked for 15 minutes'
  };
};
