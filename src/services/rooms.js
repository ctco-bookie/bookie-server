import _ from 'lodash';

const rooms = JSON.parse(process.env.ROOMS ? process.env.ROOMS : '[]');

const byEmail = email => _.find(rooms, room => room.email.toLowerCase() === email.toLowerCase());
const byNumber = number => _.find(rooms, room => room.number === number);
const byFloor = floor => _.filter(rooms, room => room.floor === floor);

const byId = roomId => {
  return isNumeric(roomId) ? byNumber(+roomId) : byEmail(roomId);
};

const isNumeric = value => {
  if (typeof value === 'number') return true;
  var str = (value || '').toString();
  if (!str) return false;
  return !isNaN(str);
};


export default {
  byEmail,
  byFloor,
  byNumber,
  byId,
  all: () => rooms
}
