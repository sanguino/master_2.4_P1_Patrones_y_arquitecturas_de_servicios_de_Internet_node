import {ExpressServer} from "./ExpressServer.js";
import {mongoConnect} from "./MongoInterface.js";

import {ProductRepository} from "./infrastructure/ProductRepository.js";
import {ProductUseCase} from "./domain/ProductUseCase.js";
import {ProductService} from "./service/ProductService.js";
import {ProductController} from "./controller/ProductController.js";

import {CartRepository} from "./infrastructure/CartRepository.js";
import {CartUseCase} from "./domain/CartUseCase.js";
import {CartService} from "./service/CartService.js";
import {CartController} from "./controller/CartController.js";

const productRepository = ProductRepository({});
const productUseCase = ProductUseCase({productRepository});
const productService = ProductService({productUseCase});
const productController = ProductController({productService});

const cartRepository = CartRepository({productRepository});
const cartUseCase = CartUseCase({cartRepository, productRepository});
const cartService = CartService({cartUseCase});
const cartController = CartController({cartService});

const server = ExpressServer({productController, cartController});


await mongoConnect();

server.listen(8080, () => console.log('Server listening on port 8080!'));