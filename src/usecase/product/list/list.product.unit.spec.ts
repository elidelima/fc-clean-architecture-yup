import Product from '../../../domain/product/entity/product';
import ListProductUseCase from './list.product.usecase';

const product1 = new Product('P1', 'Pincel', 200);
const product2 = new Product('P2', 'Tinta', 300);

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    find: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test for listing products use case', () => {
  it('should list all products', async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const result = await usecase.execute({});

    expect(result.products.length).toEqual(2);
    expect(result.products[0].id).toEqual(product1.id);
    expect(result.products[0].name).toEqual(product1.name);
    expect(result.products[0].price).toEqual(product1.price);
    expect(result.products[1].id).toEqual(product2.id);
    expect(result.products[1].name).toEqual(product2.name);
    expect(result.products[1].price).toEqual(product2.price);
  });
});
