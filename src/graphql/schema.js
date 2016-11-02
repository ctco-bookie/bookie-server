import {GraphQLSchema} from 'graphql';
import query from './queries/root';

const schema = new GraphQLSchema({query});

export default schema;
