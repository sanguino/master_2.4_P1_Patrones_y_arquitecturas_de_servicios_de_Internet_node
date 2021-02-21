export const ProductService = ({productUseCase}) => ({
  async getAllProducts () {
    return await productUseCase.findAll();
  },

  async save (product) {
    return await productUseCase.save(product);
  }
});