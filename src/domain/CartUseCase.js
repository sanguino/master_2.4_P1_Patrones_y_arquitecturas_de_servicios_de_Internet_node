export const CartUseCase = ({cartRepository, productRepository}) => ({

  async save() {
    return await cartRepository.save({
      products: new Map(),
      finalized: false,
    });
  },

  async finalizeById(id) {
    const cart = await this.findById(id);
    if (cart) {
      cart.finalized = true;
      return await cartRepository.update(cart)
    }
    return false;
  },

  async findById(id) {
    return await cartRepository.findById(id);
  },

  async deleteById(id) {
    return await cartRepository.deleteById(id);
  },

  async addProduct(cartId, prodId, prodQuantity) {
    const cart = await cartRepository.findById(cartId);
    const product = await productRepository.findById(prodId);
    if (cart && product) {
      cart.products.set(prodId, prodQuantity)
      return await cartRepository.update(cart);
    }
    return false
  },

});