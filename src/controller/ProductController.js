import { Router } from 'express';

export const ProductController = ({ productService }) => {
  const routes = Router();

  routes.get('/api/products', async function (req, res) {
    return res.json(await productService.getAllProducts());
  });


  return routes;
}




