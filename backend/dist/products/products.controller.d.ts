import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(createProductDto: any): Promise<Product>;
    update(id: string, updateProductDto: any): Promise<Product>;
    delete(id: string): Promise<any>;
}
