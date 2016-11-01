import rooms from '../rooms';

export const get = async ctx => {
    ctx.body = rooms;
};

