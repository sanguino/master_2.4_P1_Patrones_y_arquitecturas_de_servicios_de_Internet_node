import {ProductEntity} from "./entities/ProductEntity.js";

function productEntityDto2FullProductDtoMapper(productEntityDto) {
  return {
    id: productEntityDto._id.toString(),
    name: productEntityDto.name,
    price: productEntityDto.price
  }
}

export const ProductRepository = ({}) => ({
  async findAll() {
    const products = await ProductEntity.find();
    return products.map(productEntityDto2FullProductDtoMapper);
  },

  async save(product) {
    const productEntityDto = new ProductEntity(product);
    await productEntityDto.save();
    return productEntityDto2FullProductDtoMapper(productEntityDto);
  },

  async findById(id) {
    const productEntityDto = await ProductEntity.findById(id);
    if (productEntityDto) {
      return productEntityDto2FullProductDtoMapper(productEntityDto);
    }
    return false;
  },

  async delete(product) {
    const productEntityDto = await ProductEntity.findById(product.id);
    await productEntityDto.delete();
  },

});
