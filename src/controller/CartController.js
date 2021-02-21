import { Router } from 'express';

export const CartController = ({ cartService }) => {
  const routes = Router();

  routes.post('/api/shoppingcarts', async function (req, res) {
    const cart = await cartService.save();
    return res.json(cart);
  });

  routes.patch('/api/shoppingcarts/:id', async function (req, res) {
    const cart = await cartService.finalizeById(req.params.id);
    if (cart) {
      return res.json(cart);
    }
    return res.status(404).send('Not found!');
  });

  routes.get('/api/shoppingcarts/:id', async function (req, res) {
    const cart = await cartService.findById(req.params.id);
    if (cart) {
      return res.json(cart);
    }
    return res.status(404).send('Not found!');
  });

  routes.delete('/api/shoppingcarts/:id', async function (req, res) {
    const cart = await cartService.deleteById(req.params.id);
    if (cart) {
      return res.json(cart);
    }
    return res.status(204).send('No content!');
  });

  return routes;
}




