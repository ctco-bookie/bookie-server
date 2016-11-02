import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLBoolean
} from 'graphql';
import {
  resolveRooms,
  resolveRoom
} from '../resolvers/rooms';

const RoomType = new GraphQLObjectType({
  name: 'room',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    number: {
      type: GraphQLInt
    },
    floor: {
      type: GraphQLInt
    },
    capacity: {
      type: GraphQLInt
    },
    busy: {
      type: GraphQLBoolean
    },
    master: {
      type: GraphQLBoolean
    }
  })
});

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    rooms: {
      type: new GraphQLList(RoomType),
      args: {
        id : {
          type: GraphQLInt
        }
      },
      resolve: resolveRooms
    },
    room: {
      type: RoomType,
      args: {
        id : {
          type: GraphQLInt
        }
      },
      resolve: resolveRoom
    }
  })
});

const schema = new GraphQLSchema({query});

export default schema;
