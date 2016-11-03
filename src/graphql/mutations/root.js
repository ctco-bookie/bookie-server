import BookResult from '../types/book-result';
import {booker} from '../resolvers/room-booking';
import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql';

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    bookRoom: {
      type: BookResult,
      args: {
        roomId: {type: new GraphQLNonNull(GraphQLInt)},
        bookForMinutes: {type: GraphQLInt}
      },
      resolve: booker
    }
  }),
});

export default Mutation;
