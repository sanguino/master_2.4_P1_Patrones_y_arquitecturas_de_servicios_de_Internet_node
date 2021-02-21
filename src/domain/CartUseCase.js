export const CartUseCase = ({cartRepository}) => ({

  async save () {
    return await cartRepository.save({
      products: new Map(),
      finalized: false,
    });
  },

  async finalizeById (id) {
    const cart = await this.findById(id);
    if (cart) {
      cart.finalized = true;
      return await cartRepository.update(cart)
    }
    return false;
  },

  async findById (id) {
    return await cartRepository.findById(id);
  },

});