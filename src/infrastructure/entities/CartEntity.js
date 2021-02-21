import mongoose from 'mongoose';

const {model, Schema} = mongoose;

const cartSchema = new Schema({
  products: {
    type: Map,
    of: Number
  },
  finalized: Boolean,
});

export const CartEntity = model('CartEntity', cartSchema);
