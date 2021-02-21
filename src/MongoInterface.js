import mongoose from 'mongoose';
import {ProductEntity} from "./infrastructure/entities/ProductEntity.js";

const mongoUrl = 'mongodb://localhost:27017/books_blog';

export async function mongoConnect() {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

    await ProductEntity.deleteMany({}).exec();
}
