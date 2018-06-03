import {  GraphQLSchema,  GraphQLObjectType,} from 'graphql';import { ProductQuery, ProductMutation } from '../product/product-resolver';import { CommentQuery, CommentMutation } from '../comment/comment-resolver';import { GraphQLSkipDirective } from '../gql-derictives';const test = 123;/** * @docs params * query */const query = new GraphQLObjectType({  name: 'Query',  description: 'Get product by id and products list',  fields: {    ...ProductQuery,    ...CommentQuery  },  test});/** * @description mutation */const mutation = new GraphQLObjectType({  name: 'Mutation',  description: 'Add product, update and delete product',  fields: {    ...ProductMutation,    ...CommentMutation  }});/** * @description Export schema */export default new GraphQLSchema({  directives: [    GraphQLSkipDirective  ],  query,  mutation});