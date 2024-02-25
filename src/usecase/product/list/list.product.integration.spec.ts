import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import ListProductUseCase from './list.product.usecase';
import Product from '../../../domain/product/entity/product';

describe('Test list product use case', () => {
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

  it('should list all product', async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product('P1', 'Pincel', 200);
    const product2 = new Product('P2', 'Tinta', 300);

    await productRepository.create(product1);
    await productRepository.create(product2);
    
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
