import {Router} from 'express';

const cartResponseMapper = cart => {
  const productsResponse = [];
  for (let [product, quantity] of cart.products) {
    productsResponse.push({
      id: product.id,
      name: product.name,
      quantity
    });
  }
  return {
    ...cart,
    products: productsResponse,
  }
};

export const CartController = ({cartService}) => {
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

  routes.post('/api/shoppingcarts/:cartId/product/:prodId/quantity/:prodQuantity', async function (req, res) {
    const cart = await cartService.addProduct(req.params.cartId, req.params.prodId, req.params.prodQuantity);
    if (cart) {
      const responseCart = cartResponseMapper(cart);
      return res.json(responseCart);
    }
    return res.status(404).send('Not found!');
  });

  return routes;
}




