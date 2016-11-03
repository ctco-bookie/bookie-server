import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

const Availability = new GraphQLObjectType({
  name: 'Availability',
  fields: () => ({
    busy: {
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

export default Availability;
