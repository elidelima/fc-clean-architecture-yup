import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from './create.product.dto';

export class CreateProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = new Product(input.id, input.name, input.price);
    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
