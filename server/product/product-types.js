import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import {
  CommentType,
} from '../comment/comment-types';

const ProductType = new GraphQLObjectType({
  name: 'ProductType',
  description: 'Product type fields',
  fields: () => ({
    url: {
      type: GraphQLString,
      description: 'Product link',
    },
    cover: {
      type: GraphQLString,
      description: 'Product image',
    },
    currencyLabel: { type: GraphQLString },
    retailPrice: { type: GraphQLInt },
    wholesalePrice: { type: GraphQLInt },
    favoriteProducts: {
      type: new GraphQLList(ProductType),
      resolve: async (parentValue, args, { Product }) => {
        return await Product.find();
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async ({ _id }, args, { Comment }) => {
        return await Comment.find({
          productId: _id
        });
      }
    }
  })
});

const ProductInputType = new GraphQLInputObjectType({
  name: 'ProductInputType',
  description: 'Product payload definition',
  fields: () => ({
    url: {type: new GraphQLNonNull(GraphQLString)},
    cover: {type: new GraphQLNonNull(GraphQLString)},
    currencyLabel: {type: new GraphQLNonNull(GraphQLString)},
    retailPrice: {type: new GraphQLNonNull(GraphQLInt)},
    wholesalePrice: {type: new GraphQLNonNull(GraphQLInt)},
  }),
});

const ProductUpdateInputType = new GraphQLInputObjectType({
  name: 'ProductUpdateInputType',
  description: 'Product payload definition',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    url: {type: GraphQLString},
    cover: {type: GraphQLString},
    currencyLabel: {type: GraphQLString},
    retailPrice: {type: GraphQLInt},
    wholesalePrice: {type: GraphQLInt},
  }),
});

export {
  ProductType,
  ProductInputType,
  ProductUpdateInputType
}