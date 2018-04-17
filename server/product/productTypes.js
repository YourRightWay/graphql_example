import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const ProductType = new GraphQLObjectType({
  name: 'ProductType',
  description: 'Product type fields',
  fields: {
    id: { type: GraphQLInt },
    url: { type: GraphQLString },
    cover2: { type: GraphQLString },
    currency_label: { type: GraphQLString },
    retail_price: { type: GraphQLInt },
    wholesale_price: { type: GraphQLInt },
  }
});

const ProductInputType = new GraphQLInputObjectType({
  name: 'ProductInputType',
  description: 'Product payload definition',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    url: {type: new GraphQLNonNull(GraphQLString)},
    cover2: {type: new GraphQLNonNull(GraphQLString)},
    currency_label: {type: new GraphQLNonNull(GraphQLString)},
    retail_price: {type: new GraphQLNonNull(GraphQLInt)},
    wholesale_price: {type: new GraphQLNonNull(GraphQLInt)},
  }),
});

const ProductUpdateInputType = new GraphQLInputObjectType({
  name: 'ProductUpdateInputType',
  description: 'Product payload definition',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    url: {type: GraphQLString},
    cover2: {type: GraphQLString},
    currency_label: {type: GraphQLString},
    retail_price: {type: GraphQLInt},
    wholesale_price: {type: GraphQLInt},
  }),
});

export {
  ProductType,
  ProductInputType,
  ProductUpdateInputType
}