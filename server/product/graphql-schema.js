import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';
import { ProductQuery, ProductMutation } from './resolvers';
import { GraphQLSkipDirective } from './directive';

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Get product by id and products list',
  fields: {
    ...ProductQuery
  }
});

const mutationQuery = new GraphQLObjectType({
  name: 'MutationQuery',
  description: 'Add products, update and delete product',
  fields: {
    ...ProductMutation
  }
});

export default new GraphQLSchema({
  directives: [
    GraphQLSkipDirective
  ],
  query: rootQuery,
  mutation: mutationQuery
});