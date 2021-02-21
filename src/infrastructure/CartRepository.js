import {CartEntity} from "./entities/CartEntity.js";

export const CartRepository = ({productRepository}) => {

  const mapIds2Products = async products => {
    const fullProducts = new Map();
    for (let [prodId, quantity] of products) {
      fullProducts.set(await productRepository.findById(prodId), quantity)
    }
    return fullProducts;
  };

  const fullCartMapper = async cartEntity => ({
    id: cartEntity._id.toString(),
    products: await mapIds2Products(cartEntity.products),
    finalized: cartEntity.finalized
  });

  const mapProducts2Ids = products => {
    const idsProducts = new Map();
    for (let [product, quantity] of products) {
      idsProducts.set(product.id, quantity)
    }
    return idsProducts;
  };

  return {
    async save(cart) {
      const cartSaved = new CartEntity(cart);
      await cartSaved.save();
      return await fullCartMapper(cartSaved);
    },

    async findById(id) {
      const cart = await CartEntity.findById(id);
      if (cart) {
        return await fullCartMapper(cart);
      }
      return false;
    },

    async update(cart) {
      const cartEntity = await CartEntity.findById(cart.id);
      if (cartEntity) {
        cartEntity.products = mapProducts2Ids(cart.products);
        cartEntity.finalized = cart.finalized;
        await cartEntity.save();
        return await fullCartMapper(cartEntity);
      }
      return false;
    },

    async deleteById(id) {
      const cart = await CartEntity.findById(id);
      if (cart) {
        cart.delete();
        return await fullCartMapper(cart);
      }
      return false;
    },
  }
};