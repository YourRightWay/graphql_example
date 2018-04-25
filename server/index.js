import Express from 'express';import morgan from 'morgan';import expressGraphQL from 'express-graphql';import mongoose from 'mongoose';import { errorHandler } from './middlewares';import serverConfig from './config';import schema from './gql-schema';import Product from './product/product-model';import Comment from './comment/comment-model';import { productByIdLoader } from './product/product-loaders';const app = new Express();app.use(morgan('combined'));mongoose.Promise = global.Promise;mongoose.set('debug', true);mongoose.connect(serverConfig.db, (err) => {  if (err) throw err;  console.log('mongo connect');});app.use('/graphql', expressGraphQL({  schema,  graphiql: true,  context: {    productByIdLoader: productByIdLoader(Product),    Product,    Comment  }}));app.use(errorHandler);app.listen(serverConfig.port, (err) => {  if (err) throw err;  console.log(`GraphQL example is running on port: ${serverConfig.port}!`);});export default app;