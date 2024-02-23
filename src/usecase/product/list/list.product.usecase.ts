import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputListProductDto, OutPutListProductDto } from './list.product.dto';


class Mapper {
  static toOutput(products: Product[]): OutPutListProductDto {
    return {
      products: products.map((product) => 
        ({ 
          id: product.id, 
          name: product.name, 
          price: product.price}
        )
      ),
    }
  }
}

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListProductDto): Promise<OutPutListProductDto> {
    const products = await this.productRepository.findAll();
    return Mapper.toOutput(products);
  }
}
