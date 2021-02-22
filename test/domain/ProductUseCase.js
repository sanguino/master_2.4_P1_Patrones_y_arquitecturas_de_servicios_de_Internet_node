import {expect} from 'chai';
import {ProductUseCase} from '../../src/domain/ProductUseCase.js';
import {ProductRepository} from "../../src/infrastructure/ProductRepository.js";
import sinon from 'sinon';

const sandbox = sinon.createSandbox();
const productRepository = ProductRepository({});
let productUseCase;

beforeEach(() => {
  productUseCase = ProductUseCase({productRepository});
});

afterEach(() => {
  sandbox.restore();
});

describe('when create product', async () => {

  it('then save is called and fullProductDto is returned', async () => {
    const name = "p1";
    const price = 1;
    sandbox.stub(productRepository, 'save').returns({id:1, name, price});

    const response = await productUseCase.save({name, price});

    expect(productRepository.save.calledOnce);
    expect(response.name).to.equal(name);
    expect(response.price).to.equal(price);

  });
});

describe('when delete product', async () => {
  it('and product exists then delete is called and fullProductDto is returned', async () => {
    const id = 1;
    sandbox.stub(productRepository, 'findById').returns({id});
    sandbox.stub(productRepository, 'delete');

    const response = await productUseCase.deleteById(id);

    expect(productRepository.findById.calledOnce);
    expect(productRepository.delete.calledOnce);
    expect(response.id).to.equal(id);
  });

  it('and product not exists then delete is not called and false is returned', async () => {
    const id = 1;
    sandbox.stub(productRepository, 'findById').returns(false);
    sandbox.stub(productRepository, 'delete');

    const response = await productUseCase.deleteById(id);

    expect(productRepository.findById.calledOnce);
    expect(productRepository.delete.notCalled);
    expect(response).to.equal(false);
  });
});
