import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql';
import BookResult from './types/book-result';
import resolveRoomBooking from './resolvers/room-booking';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    bookRoom: {
      type: BookResult,
      args: {
        roomNumber: {type: new GraphQLNonNull(GraphQLInt)},
        bookForMinutes: {type: GraphQLInt, defaultValue: 15}
      },
      resolve: resolveRoomBooking
    }
  }),
});

export default Mutation;
