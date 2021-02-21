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

});