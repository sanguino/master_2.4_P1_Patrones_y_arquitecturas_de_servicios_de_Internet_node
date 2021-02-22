import {Router} from 'express';

export const ProductController = ({productService}) => {
  const routes = Router();

  routes.get('/api/products', async function (req, res) {
    const productResponseDto = await productService.getAllProducts();
    return res.json(productResponseDto);
  });

  routes.post('/api/products', async function (req, res) {
    const productResponseDto = await productService.save({
      name: req.body.name,
      price: req.body.price
    });
    return res.status(201).json(productResponseDto);
  });

  routes.get('/api/products/:id', async function (req, res) {
    const productResponseDto = await productService.findById(req.params.id);
    if (productResponseDto) {
      return res.json(productResponseDto);
    }
    return res.status(404).send('Not found!');
  });

  routes.delete('/api/products/:id', async function (req, res) {
    const productResponseDto = await productService.deleteById(req.params.id);
    if (productResponseDto) {
      return res.json(productResponseDto);
    }
    return res.status(204).send('No content!');
  });

  return routes;
}
