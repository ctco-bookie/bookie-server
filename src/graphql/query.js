import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import resolveRoom from './resolvers/room';
import resolveRooms from './resolvers/rooms';
import Room from './types/room'

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    room: {
      type: Room,
      args: {
        roomNumber: {type: GraphQLInt}
      },
      resolve: resolveRoom
    },
    rooms: {
      args: {
        floorMasterRoomNumber: {type: GraphQLInt}
      },
      type: new GraphQLList(Room),
      resolve: resolveRooms
    }
  })
});

export default Query;
