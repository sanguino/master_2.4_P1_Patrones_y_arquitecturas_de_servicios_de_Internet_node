export const CartService = ({cartUseCase}) => ({

  async save () {
    return await cartUseCase.save();
  },

  async finalizeById (id) {
    return await cartUseCase.finalizeById(id);
  },

  async findById (id) {
    return await cartUseCase.findById(id);
  },

  async deleteById (id) {
    return await cartUseCase.deleteById(id);
  },

  async addProduct(cartId, prodId, prodQuantity) {
    return await cartUseCase.addProduct(cartId, prodId, prodQuantity);
  },

  async removeProduct(cartId, prodId) {
    return await cartUseCase.removeProduct(cartId, prodId);
  },

});