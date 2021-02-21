export const ProductService = ({productUseCase}) => ({
  getAllProducts () {
    return productUseCase.findAll();
  }
});