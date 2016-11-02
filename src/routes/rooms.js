import schema from './room-schema';
import convert from 'koa-convert';
import graphqlHTTP from 'koa-graphql';

export const getAll = convert(graphqlHTTP({
  schema,
  graphiql: true
}));
