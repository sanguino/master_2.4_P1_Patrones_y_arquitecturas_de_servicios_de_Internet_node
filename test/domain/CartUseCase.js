import { expect } from 'chai';
import {CartUseCase} from '../../src/domain/CartUseCase.js';
import sinon from 'sinon';

const CartRepository = (products = []) => ({
  async save (cart) {
    return cart;
  },
  async findById (id) {
    return {id, products: new Map(), finalized: false}
  },
  async update (cart) {
    return {id:cart.id, products: new Map(products), finalized: false}
  }
});

const ProductRepository = () => ({
  async findById (id) {
    return {id, products: new Map(), finalized: false}
  }
});

const sandbox = sinon.createSandbox();
let cartUseCase;
let cartRepository;
let productRepository;

afterEach(() => {
  sandbox.restore();
});

describe('when create cart', async() => {

  beforeEach(()=> {
    cartRepository = CartRepository();
    productRepository = ProductRepository();
    cartUseCase = CartUseCase({cartRepository, productRepository});
    sandbox.spy(cartRepository.save);
  });

  it('then repository is called and default values are returned', async() => {

    const response = await cartUseCase.save();

    expect(cartRepository.save.calledOnce);
    expect(response.finalized).to.equal(false);
    expect(response.products).to.be.a('map');
    expect(response.products.size).to.equal(0);

  });
});

describe('when add product to cart', async() => {

  const cartId = 1;
  const prodId = 2;
  const prodQuantity = 3;

  beforeEach(()=> {
    cartRepository = CartRepository([[{id:prodId, name:'p1', price:10}, prodQuantity]]);
    productRepository = ProductRepository();
    cartUseCase = CartUseCase({cartRepository, productRepository});
    sandbox.spy(cartRepository.findById);
    sandbox.spy(productRepository.findById);
  });

  it('then repositories are called and cart is returned', async() => {
    const response = await cartUseCase.addOrUpdateProduct(cartId, prodId, prodQuantity);

    expect(cartRepository.findById.calledOnce);
    expect(productRepository.findById.calledOnce);

    expect(response.finalized).to.equal(false);
    expect(response.products).to.be.a('map');
    expect(response.products.size).to.equal(1);
  });
});