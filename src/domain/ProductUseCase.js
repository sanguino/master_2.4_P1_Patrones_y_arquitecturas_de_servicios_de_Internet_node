export const ProductUseCase = ({productRepository}) => ({
  findAll () {
    return productRepository.findAll();
  }
});