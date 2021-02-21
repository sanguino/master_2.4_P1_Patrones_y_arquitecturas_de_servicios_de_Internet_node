export const CartUseCase = ({cartRepository}) => ({

  async save () {
    return await cartRepository.save({
      products: new Map(),
      finalized: false,
    });
  },

});