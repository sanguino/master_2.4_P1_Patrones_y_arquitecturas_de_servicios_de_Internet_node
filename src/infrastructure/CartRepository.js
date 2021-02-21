import {CartEntity} from "./entities/CartEntity.js";
import {ProductEntity} from "./entities/ProductEntity.js";

const fullCartMapper = (cartEntity => ({
  id: cartEntity._id,
  products: cartEntity.products,
  finalized: cartEntity.finalized
}))

export const CartRepository = ({}) => ({

  async save(cart) {
    const cartSaved = new CartEntity(cart);
    await cartSaved.save();
    return fullCartMapper(cartSaved);
  },

  async findById(id) {
    const cart = await CartEntity.findById(id);
    if (cart) {
      return fullCartMapper(cart);
    }
    return false;
  },

  async update(cart) {
    const cartEntity = await CartEntity.findById(cart.id);
    if (cartEntity) {
      cartEntity.products = cart.products;
      cartEntity.finalized = cart.finalized;
      await cartEntity.save();
      return fullCartMapper(cartEntity);
    }
    return false;
  },

  async deleteById(id) {
    const cart = await CartEntity.findById(id);
    if (cart) {
      cart.delete();
      return fullCartMapper(cart);
    }
    return false;
  },

});