import {ExpressServer} from "./ExpressServer.js";
import {ProductUseCase} from "./domain/ProductUseCase.js";
import {ProductService} from "./service/ProductService.js";
import {ProductController} from "./controller/ProductController.js";

const productUseCase = ProductUseCase({});
const productService = ProductService({productUseCase});
const productController = ProductController({productService});
const server = ExpressServer({productController});



server.listen(8080, () => console.log('Server listening on port 8080!'));