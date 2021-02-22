export const CartUseCase = ({cartRepository, productRepository}) => ({

  async save() {
    const cart = {
      products: new Map(),
      finalized: false,
    };
    return await cartRepository.save(cart);
  },

  async finalizeById(id) {
    const fullCartDto = await cartRepository.findById(id);
    if (fullCartDto) {
      fullCartDto.finalized = true;
      return await cartRepository.update(fullCartDto)
    }
    return false;
  },

  async findById(id) {
    const fullCartDto = await cartRepository.findById(id);
    return fullCartDto;
  },

  async deleteById(id) {
    const fullCartDto = await cartRepository.deleteById(id);
    return fullCartDto;
  },

  async addOrUpdateProduct(cartId, prodId, prodQuantity) {
    const fullCartDto = await cartRepository.findById(cartId);
    const fullProductDto = await productRepository.findById(prodId);
    if (fullCartDto && fullProductDto) {
      fullCartDto.products.delete(fullProductDto);
      fullCartDto.products.set(fullProductDto, prodQuantity);
      return await cartRepository.update(fullCartDto);
    }
    return false;
  },

  async removeProduct(cartId, prodId) {
    const fullCartDto = await cartRepository.findById(cartId);
    if (fullCartDto) {
      const fullProductDto = Array.from(fullCartDto.products.keys()).find(p => p.id === prodId);
      if (fullProductDto) {
        fullCartDto.products.delete(fullProductDto);
        return await cartRepository.update(fullCartDto);
      }
    }
    return false;
  },

});
