export const ProductUseCase = ({productRepository}) => ({
  async findAll () {
    return await productRepository.findAll();
  }
});