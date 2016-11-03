import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import {
  roomAvailabilityWithFloorOptions,
  roomAvailability
} from '../resolvers/room-avaiability';
import {
  getRoom,
  getAllRooms
} from '../resolvers/room';
import Room from '../types/room'

const roomIdParam = {
  roomId: {
    type: GraphQLInt
  }
};

const Query = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    roomAvailabilityWithFloorOptions: {
      type: new GraphQLList(Room),
      args: roomIdParam,
      resolve: roomAvailabilityWithFloorOptions
    },
    roomAvailability: {
      type: Room,
      args: roomIdParam,
      resolve: roomAvailability
    },
    room: {
      type: Room,
      args: roomIdParam,
      resolve: getRoom
    },
    rooms: {
      type: new GraphQLList(Room),
      resolve: getAllRooms
    }
  })
});

export default Query;
