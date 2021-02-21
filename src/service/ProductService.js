export const ProductService = ({productUseCase}) => ({
  async getAllProducts () {
    return await productUseCase.findAll();
  },

  async save (product) {
    return await productUseCase.save(product);
  },

  async findById (id) {
    return await productUseCase.findById(id);
  },

  async deleteById (id) {
    return await productUseCase.deleteById(id);
  },

});