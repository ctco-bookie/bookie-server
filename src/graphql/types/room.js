import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import Availability from './availability';
import {resolveAvailability} from '../resolvers/avaiability';

const Room = new GraphQLObjectType({
  name: 'Room',
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
    availability: {
      resolve: resolveAvailability,
      type: Availability
    }
  })
});

export default Room;
