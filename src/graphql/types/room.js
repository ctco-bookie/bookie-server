import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

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
    busy: {
      type: GraphQLBoolean
    },
    master: {
      type: GraphQLBoolean
    },
    availableForDuration: {
      type: GraphQLInt
    },
    availableFor: {
      type: GraphQLString
    },
    availableFrom: {
      type: GraphQLString
    }
  })
});

export default Room;
