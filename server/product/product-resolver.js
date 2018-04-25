import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  ProductType,
  ProductInputType,
  ProductUpdateInputType
} from './product-types';

const ProductQuery = {
  getProductById: {
    type: ProductType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (parentValue, { id: _id }, { productByIdLoader }) => {
      return productByIdLoader.load(_id);
    }
  },
  products: {
    type: new GraphQLList(ProductType),
    resolve: async (parentValue, args, { Product }) => {
      return await Product.find();
    }
  }
};

const ProductMutation = {
  addProduct: {
    type: ProductType,
    args: {
      input : {
        type: new GraphQLNonNull(ProductInputType),
      }
    },
    resolve: async (parentValue, { input }, { Product }) => {
      return await Product.create({
        ...input,
      });
    }
  },
  updateProduct: {
    type: new GraphQLList(ProductType),
    args: {
      input : {
        type: new GraphQLNonNull(ProductUpdateInputType),
      }
    },
    resolve: async (parentValue, { input }, { Product }) => {
      const { id: _id, url, cover, retailPrice, currencyLabel, description, name } = input;
      await Product.findOneAndUpdate(
        { _id },
        {
          $set: {
            url, cover, retailPrice, currencyLabel, description, name
          }
        }
      );

      return await Product.find();
    }
  },
  deleteProduct: {
    type: new GraphQLList(ProductType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parentValue, { id: _id }, { Product }) => {
      await Product.remove({ _id });
      return await Product.find();
    }
  }
};

export {
  ProductQuery,
  ProductMutation
};