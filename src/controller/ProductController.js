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
    console.log(product)
    return res.json(product);
  });


  return routes;
}




