import {GraphQLSchema} from 'graphql';
import mutation from './mutations/root';
import query from './queries/root';

const schema = new GraphQLSchema(
  {query, mutation}
);

export default schema;
