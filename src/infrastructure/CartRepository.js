import {CartEntity} from "./entities/CartEntity.js";

export const CartRepository = ({productRepository}) => {

  async function productsIds2FullProductsDtoMapper(productsIds) {
    const fullProductDtos = new Map();
    for (let [prodId, quantity] of productsIds) {
      fullProductDtos.set(await productRepository.findById(prodId), quantity)
    }
    return fullProductDtos;
  }

  async function cartEntitiesDto2fullCartDtoMapper(cartEntityDto) {
    return {
      id: cartEntityDto._id.toString(),
      products: await productsIds2FullProductsDtoMapper(cartEntityDto.products),
      finalized: cartEntityDto.finalized
    }
  }

  function fullProductsDto2ProductsIdsMapper(fullProductDtos) {
    const productsIds = new Map();
    for (let [product, quantity] of fullProductDtos) {
      productsIds.set(product.id, quantity)
    }
    return productsIds;
  }

  return {
    async save(cart) {
      const cartEntityDto = new CartEntity(cart);
      await cartEntityDto.save();
      const fullCartDto = await cartEntitiesDto2fullCartDtoMapper(cartEntityDto);
      return fullCartDto;
    },

    async findById(id) {
      const cartEntityDto = await CartEntity.findById(id);
      if (cartEntityDto) {
        const fullCartDto = await cartEntitiesDto2fullCartDtoMapper(cartEntityDto);
        return fullCartDto;
      }
      return false;
    },

    async update(fullCartDto) {
      const cartEntityDto = await CartEntity.findById(fullCartDto.id);
      if (cartEntityDto) {
        cartEntityDto.products = fullProductsDto2ProductsIdsMapper(fullCartDto.products);
        cartEntityDto.finalized = fullCartDto.finalized;
        await cartEntityDto.save();
        return await cartEntitiesDto2fullCartDtoMapper(cartEntityDto);
      }
      return false;
    },

    async deleteById(id) {
      const cartEntityDto = await CartEntity.findById(id);
      if (cartEntityDto) {
        cartEntityDto.delete();
        return await cartEntitiesDto2fullCartDtoMapper(cartEntityDto);
      }
      return false;
    },

  }
};
