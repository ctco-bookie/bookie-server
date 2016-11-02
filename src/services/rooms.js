import _ from 'lodash';

const rooms = JSON.parse(process.env.ROOMS ? process.env.ROOMS : '[]');

const byEmail = email => _.find(rooms, room => room.email.toLowerCase() === email.toLowerCase());
const byNumber = number => _.find(rooms, room => room.number === number);
const byFloor = floor => _.filter(rooms, room => room.floor === floor);

export default {
  byEmail,
  byFloor,
  byNumber,
  all: () => rooms
}
