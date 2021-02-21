export const ProductUseCase = ({productRepository}) => ({
  async findAll () {
    return await productRepository.findAll();
  },
  async save (product) {
    return await productRepository.save(product);
  }
});