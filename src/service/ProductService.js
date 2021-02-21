export const ProductService = ({productUseCase}) => ({
  async getAllProducts () {
    return await productUseCase.findAll();
  }
});