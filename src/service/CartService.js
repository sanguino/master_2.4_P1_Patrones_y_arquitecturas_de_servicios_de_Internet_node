export const CartService = ({cartUseCase}) => ({

  async save () {
    return await cartUseCase.save();
  },

});