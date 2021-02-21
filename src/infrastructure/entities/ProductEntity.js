import mongoose from 'mongoose';

const {model, Schema} = mongoose;

const productSchema = new Schema({
    name: String,
    price: Number,
});

export const ProductEntity = model('ProductEntity', productSchema);
