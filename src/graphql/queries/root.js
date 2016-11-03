import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLEnumType
} from 'graphql';
import {
  resolveRoom,
  resolveRooms
} from '../resolvers/room';
import Room from '../types/room'

const roomNumberParam = {
  roomNumber: {
    type: new GraphQLNonNull(GraphQLInt)
  }
};

const Query = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    room: {
      type: Room,
      args: roomNumberParam,
      resolve: resolveRoom
    },
    rooms: {
      args: {
        floorMasterRoomNumber: {
          type: GraphQLInt
        },
        busy: {
          type: GraphQLBoolean
        }
      },
      type: new GraphQLList(Room),
      resolve: resolveRooms
    }
  })
});

export default Query;
