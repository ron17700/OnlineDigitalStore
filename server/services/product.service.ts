import ProductModel, {IProduct} from '../models/product.model';
import { Types } from 'mongoose';

const ProductService = {
    async getAllProducts(): Promise<{ products: IProduct[] }> {
        return { products: await ProductModel.find().populate('category').exec() };
    },
    async getProduct(productId: string): Promise<IProduct | null> {
        return ProductModel.findOne({ _id: new Types.ObjectId(productId) });
    },
    async createProduct(product: IProduct): Promise<IProduct> {
        return await ProductModel.create(product);
    }
};

export default ProductService;
