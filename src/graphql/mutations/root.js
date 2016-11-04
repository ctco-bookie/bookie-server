import BookResult from '../types/book-result';
import resolveRoomBooking from '../resolvers/room-booking';
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
        roomNumber: {type: new GraphQLNonNull(GraphQLInt)},
        bookForMinutes: {type: GraphQLInt}
      },
      resolve: resolveRoomBooking
    }
  }),
});

export default Mutation;
