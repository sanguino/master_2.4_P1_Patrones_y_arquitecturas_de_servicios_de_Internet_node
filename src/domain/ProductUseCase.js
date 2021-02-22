export const ProductUseCase = ({productRepository}) => ({

  async findAll() {
    return await productRepository.findAll();
  },

  async save(fullProduct) {
    const product = {...fullProduct};
    return await productRepository.save(product);
  },

  async findById(id) {
    return await productRepository.findById(id);
  },

  async deleteById(id) {
    return await productRepository.deleteById(id);
  },

});
