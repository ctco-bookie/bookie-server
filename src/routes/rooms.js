import Rooms from '../services/rooms';

export const getAll = ctx => {
  ctx.body = Rooms.all();
};

