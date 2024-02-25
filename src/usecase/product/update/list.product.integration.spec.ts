import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import Product from '../../../domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';

describe('Test update product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should update product', async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product('P1', 'Pincel', 200);
    await productRepository.create(product1);

    const input = {
      id: 'P1',
      name: 'Pincel Updated',
      price: 220,
    };

    const usecase = new UpdateProductUseCase(productRepository);
    const result = await usecase.execute(input);
    expect(result).toEqual(input);
  });
});
