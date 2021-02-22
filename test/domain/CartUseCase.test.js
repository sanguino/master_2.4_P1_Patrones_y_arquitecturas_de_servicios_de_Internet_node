import {expect} from 'chai';
import {CartUseCase} from '../../src/domain/CartUseCase.js';
import {CartRepository} from "../../src/infrastructure/CartRepository.js";
import {ProductRepository} from "../../src/infrastructure/ProductRepository.js";
import sinon from 'sinon';

const sandbox = sinon.createSandbox();
const cartRepository = CartRepository({});
const productRepository = ProductRepository({});
let cartUseCaseTest;

beforeEach(() => {
  cartUseCaseTest = CartUseCase({cartRepository, productRepository});
  sandbox.spy(cartRepository.save);
});

afterEach(() => {
  sandbox.restore();
});

describe('when create cart', async () => {

  it('then repository is called and default values are returned', async () => {
    sandbox.stub(cartRepository, 'save').resolvesArg(0);

    const response = await cartUseCaseTest.save();

    expect(cartRepository.save.calledOnce);
    expect(response.finalized).to.equal(false);
    expect(response.products).to.be.a('map');
    expect(response.products.size).to.equal(0);

  });
});

describe('when add product to cart', async () => {

  const cartId = 1;
  const prodId = 2;
  const prodQuantity = 3;

  it('and cart and product exists then repositories are called and cart is returned with new product', async () => {
    sandbox.stub(cartRepository, 'update').resolves({
      id: cartId,
      products: new Map([[{id: prodId, name: 'p1', price: 10}, prodQuantity]]),
      finalized: false
    });
    sandbox.stub(cartRepository, 'findById').resolves({id: cartId, products: new Map(), finalized: false});
    sandbox.stub(productRepository, 'findById').resolves({id: prodId, name: 'p1', price: 10});

    const response = await cartUseCaseTest.addOrUpdateProduct(cartId, prodId, prodQuantity);

    expect(cartRepository.findById.calledOnce).to.be.true;
    expect(productRepository.findById.calledOnce).to.be.true;
    expect(response.finalized).to.equal(false);
    expect(response.products).to.be.a('map');
    expect(response.products.size).to.equal(1);
  });

  it('and cart exist but product not, then repositories are called and false is returned', async () => {
    sandbox.stub(cartRepository, 'update');
    sandbox.stub(cartRepository, 'findById').resolves({id: cartId, products: new Map(), finalized: false});
    sandbox.stub(productRepository, 'findById').resolves(false);

    const response = await cartUseCaseTest.addOrUpdateProduct(cartId, prodId, prodQuantity);

    expect(cartRepository.findById.calledOnce).to.be.true;
    expect(productRepository.findById.calledOnce).to.be.true;
    expect(cartRepository.update.notCalled).to.be.true;
    expect(response).to.equal(false);
  });

  it('and product exist but cart not, then repositories are called and false is returned', async () => {
    sandbox.stub(cartRepository, 'update');
    sandbox.stub(cartRepository, 'findById').resolves(false);
    sandbox.stub(productRepository, 'findById').resolves({id: prodId, name: 'p1', price: 10});

    const response = await cartUseCaseTest.addOrUpdateProduct(cartId, prodId, prodQuantity);

    expect(cartRepository.findById.calledOnce).to.be.true;
    expect(productRepository.findById.calledOnce).to.be.true;
    expect(cartRepository.update.notCalled).to.be.true;
    expect(response).to.equal(false);
  });

  it('and product and cart not exists, then repositories are called and false is returned', async () => {
    sandbox.stub(cartRepository, 'update');
    sandbox.stub(cartRepository, 'findById').resolves(false);
    sandbox.stub(productRepository, 'findById').resolves(false);

    const response = await cartUseCaseTest.addOrUpdateProduct(cartId, prodId, prodQuantity);

    expect(cartRepository.findById.calledOnce).to.be.true;
    expect(productRepository.findById.calledOnce).to.be.true;
    expect(cartRepository.update.notCalled).to.be.true;
    expect(response).to.equal(false);
  });
});