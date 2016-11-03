import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

const BookResult = new GraphQLObjectType({
  name: 'BookResult',
  fields: () => ({
    success: {
      type: GraphQLBoolean
    },
    message: {
      type: GraphQLString
    },
    start: {
      type: GraphQLString
    },
    end: {
      type: GraphQLString
    },
    duration: {
      type: GraphQLString
    }
  })
});

export default BookResult;
