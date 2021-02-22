export const ProductService = ({productUseCase}) => ({

  async getAllProducts() {
    return await productUseCase.findAll();
  },

  async save(productResponseDto) {
    return await productUseCase.save({
      ...productResponseDto
    });
  },

  async findById(id) {
    return await productUseCase.findById(id);
  },

  async deleteById(id) {
    return await productUseCase.deleteById(id);
  },

});
