import { Router } from 'express';

export const ProductController = ({ productService }) => {
  const routes = Router();

  routes.get('/api/products', async function (req, res) {
    return res.json(await productService.getAllProducts());
  });

  routes.post('/api/products', async function (req, res) {
    const product = await productService.save({
      name: req.body.name,
      price: req.body.price
    });
    return res.status(201).json(product);
  });

  routes.get('/api/products/:id', async function (req, res) {
    const product = await productService.findById(req.params.id);
    if (product) {
      return res.json(product);
    }
    return res.status(404).send('Not found!');
  });

  routes.delete('/api/products/:id', async function (req, res) {
    const product = await productService.deleteById(req.params.id);
    if (product) {
      return res.json(product);
    }
    return res.status(204).send('No content!');
  });

  return routes;
}




