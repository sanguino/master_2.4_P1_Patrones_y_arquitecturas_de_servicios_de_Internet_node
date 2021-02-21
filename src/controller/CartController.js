import { Router } from 'express';

export const CartController = ({ cartService }) => {
  const routes = Router();

  routes.post('/api/shoppingcarts', async function (req, res) {
    const cart = await cartService.save();
    return res.json(cart);
  });

  return routes;
}




