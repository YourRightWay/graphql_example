import {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import {
  ProductType,
  ProductInputType,
  ProductUpdateInputType
} from './productTypes';

import data from '../data/data.json';

const ProductQuery = {
  getProduct: {
    type: ProductType,
    args: {
      id: {
        type: GraphQLInt
      }
    },
    resolve: (parentValue, { id }) => {
      return data.products.find(p => p.id === id)
    }
  },
  getProductById: {
    type: ProductType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: (parentValue, { id }) => {
      return data.products.find(p => p.id === id)
    }
  },
  products: {
    type: new GraphQLList(ProductType),
    resolve: () => data.products
  }
}

const ProductMutation = {
  addProduct: {
    type: ProductType,
    args: {
      input : {
        type: new GraphQLNonNull(ProductInputType),
      }
    },
    resolve: (parentValue, args ) => {
      return args.input;
    }
  },
  updateProduct: {
    type: ProductType,
    args: {
      input : {
        type: new GraphQLNonNull(ProductUpdateInputType),
      }
    },
    resolve: (parentValue, args) => {
      const currentIndex = data.products.findIndex(p => p.id === args.input.id);
      return { ...data.products[currentIndex], ...args.input };
    }
  },
  deleteProduct: {
    type: ProductType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLInt)},
    },
    resolve: (parentValue, { id }) => {
      const currentIndex = data.products.findIndex(p => p.id === id);
      return { ...data.products[currentIndex], id };
    }
  }
}

export {
  ProductQuery,
  ProductMutation
};