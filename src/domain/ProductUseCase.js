export const ProductUseCase = ({productRepository}) => ({

  async findAll () {
    return await productRepository.findAll();
  },

  async save (product) {
    return await productRepository.save(product);
  },

  async findById (id) {
    return await productRepository.findById(id);
  }
});