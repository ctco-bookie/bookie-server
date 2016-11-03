import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import {
  roomAvailabilityWithFloorOptions,
  roomAvailability
} from '../resolvers/room-avaiability';
import Room from '../types/room'

const roomIdParam = {
  roomId: {
    type: new GraphQLNonNull(GraphQLInt)
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
    }
  })
});

export default Query;
