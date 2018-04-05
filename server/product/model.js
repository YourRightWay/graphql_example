import mongoose, { Schema } from 'mongoose';

const productSchema = Schema({
  productId: { type: String, index: true },
  // url: { type: String },
  // cover: { type: String },
  // currency_label: { type: String },
  // retail_price: { type: Number },
  // wholesale_price: { type: Number },
});

export default mongoose.model('Product', productSchema);