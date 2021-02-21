import {ProductEntity} from "./entities/ProductEntity.js";

export const ProductRepository = ({}) => ({
  async findAll() {
    const products = await ProductEntity.find();
    return products.map(product => ({
        id: product._id,
        name: product.name,
        price: product.price
      })
    );
  }
});