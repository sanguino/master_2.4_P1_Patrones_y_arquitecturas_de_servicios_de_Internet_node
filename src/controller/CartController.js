import {Router} from 'express';

function cartResponseDtoMapper(fullCartDto) {
  const productResponseDtos = [];
  for (let [product, quantity] of fullCartDto.products) {
    productResponseDtos.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity
    });
  }
  return {
    ...fullCartDto,
    products: productResponseDtos,
  }
}

export const CartController = ({cartService}) => {
  const routes = Router();

  routes.post('/api/shoppingcarts', async function (req, res) {
    const fullCartDto = await cartService.save();
    const cartResponseDto = cartResponseDtoMapper(fullCartDto);
    return res.status(201).json(cartResponseDto);
  });

  routes.patch('/api/shoppingcarts/:id', async function (req, res) {
    const fullCartDto = await cartService.finalizeById(req.params.id);
    if (fullCartDto) {
      const cartResponseDto = cartResponseDtoMapper(fullCartDto);
      return res.json(cartResponseDto);
    }
    return res.status(404).send('Not found!');
  });

  routes.get('/api/shoppingcarts/:id', async function (req, res) {
    const fullCartDto = await cartService.findById(req.params.id);
    if (fullCartDto) {
      const cartResponseDto = cartResponseDtoMapper(fullCartDto);
      return res.json(cartResponseDto);
    }
    return res.status(404).send('Not found!');
  });

  routes.delete('/api/shoppingcarts/:id', async function (req, res) {
    const fullCartDto = await cartService.deleteById(req.params.id);
    if (fullCartDto) {
      const cartResponseDto = cartResponseDtoMapper(fullCartDto);
      return res.json(cartResponseDto);
    }
    return res.status(204).send('No content!');
  });

  routes.post('/api/shoppingcarts/:cartId/product/:prodId/quantity/:prodQuantity', async function (req, res) {
    const fullCartDto = await cartService.addOrUpdateProduct(req.params.cartId, req.params.prodId, req.params.prodQuantity);
    if (fullCartDto) {
      const cartResponseDto = cartResponseDtoMapper(fullCartDto);
      return res.json(cartResponseDto);
    }
    return res.status(404).send('Not found!');
  });

  routes.delete('/api/shoppingcarts/:cartId/product/:prodId', async function (req, res) {
    const fullCartDto = await cartService.removeProduct(req.params.cartId, req.params.prodId);
    if (fullCartDto) {
      const cartResponseDto = cartResponseDtoMapper(fullCartDto);
      return res.json(cartResponseDto);
    }
    return res.status(404).send('Not found!');
  });

  return routes;
}
