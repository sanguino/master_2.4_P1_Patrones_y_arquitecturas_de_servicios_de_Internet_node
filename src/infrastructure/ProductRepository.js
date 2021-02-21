import {ProductEntity} from "./entities/ProductEntity.js";

const fullProductMapper = (productEntity => ({
  id: productEntity._id,
  name: productEntity.name,
  price: productEntity.price
}))

export const ProductRepository = ({}) => ({
  async findAll() {
    const products = await ProductEntity.find();
    return products.map(fullProductMapper);
  },

  async save(product) {
    const productSaved = new ProductEntity(product);
    await productSaved.save();
    return fullProductMapper(productSaved);
  }
});