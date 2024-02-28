import { CreateProductUseCase } from './create.product.usecase';

const input = {
  id: 'P1',
  name: 'Pincel',
  price: 200,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: input.id,
      name: input.name,
      price: input.price,
    });
  });

  it('should throw an error when id is missing', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const inputWhitoutId = { ...input };
    inputWhitoutId.id = '';

    await expect(usecase.execute(inputWhitoutId)).rejects.toThrow(
      'product: Id is required'
    );
  });

  it('should throw an error when name is missing', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const inputWhitoutName = { ...input };
    inputWhitoutName.name = '';

    await expect(usecase.execute(inputWhitoutName)).rejects.toThrow(
      'product: Name is required'
    );
  });

  it('should throw an error when id and name are missing', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const inputWhitoutNameAndId = { ...input };
    inputWhitoutNameAndId.name = '';
    inputWhitoutNameAndId.id = '';

    await expect(usecase.execute(inputWhitoutNameAndId)).rejects.toThrow(
      'product: Id is required,product: Name is required'
    );
  });

  it('should throw an error when price is invalid', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const inputWhitoutPrice = { ...input };
    inputWhitoutPrice.price = -1;

    await expect(usecase.execute(inputWhitoutPrice)).rejects.toThrow(
      'product: Price must be greater than zero'
    );
  });

  it('should throw an error when id and name are missing and price is invalid', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const invalidInput = {
      id: '',
      name: '',
      price: -1,
    };

    await expect(usecase.execute(invalidInput)).rejects.toThrow(
      'product: Id is required,product: Name is required,product: Price must be greater than zero'
    );
  });
});
