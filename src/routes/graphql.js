import schema from '../graphql/schema';
import convert from 'koa-convert';
import graphqlHTTP from 'koa-graphql';

const graphQl = convert(graphqlHTTP({
  schema,
  graphiql: true
}));

export default graphQl;
