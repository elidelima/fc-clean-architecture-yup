import Product from '../../../domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';

const product = new Product('P1', 'Pincel', 200);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test update product use case', () => {
  it('should update product', async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: 'P1',
      name: 'Pincel Updated',
      price: 220,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});
