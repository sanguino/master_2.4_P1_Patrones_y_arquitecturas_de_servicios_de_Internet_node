import {ExpressServer} from "./ExpressServer.js";

import {ProductRepository} from "./infrastructure/ProductRepository.js";
import {ProductUseCase} from "./domain/ProductUseCase.js";
import {ProductService} from "./service/ProductService.js";
import {ProductController} from "./controller/ProductController.js";

const productRepository = ProductRepository({});
const productUseCase = ProductUseCase({productRepository});
const productService = ProductService({productUseCase});
const productController = ProductController({productService});
const server = ExpressServer({productController});



server.listen(8080, () => console.log('Server listening on port 8080!'));