export const ProductUseCase = ({productRepository}) => ({

  async findAll() {
    return await productRepository.findAll();
  },

  async save(fullProductDto) {
    const product = {...fullProductDto};
    return await productRepository.save(product);
  },

  async findById(id) {
    return await productRepository.findById(id);
  },

  async deleteById(id) {
    const fullProductDto = await this.findById(id);
    if (fullProductDto) {
      await productRepository.delete(fullProductDto)
      return fullProductDto;
    }
    return false;
  },

});
