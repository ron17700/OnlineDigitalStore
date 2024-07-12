import productModel, {IProduct} from '../models/product.model';
import { Types } from 'mongoose';

const ProductService = {
    async getAllProducts(): Promise<{ products: IProduct[] }> {
        return { products: await productModel.find().populate('category').exec() };
    },
    async getProduct(productId: string): Promise<IProduct | null> {
        return productModel.findOne({ _id: new Types.ObjectId(productId) });
    },
    async createProduct(product: IProduct): Promise<IProduct> {
        return await productModel.create(product);
    },
};

export default ProductService;
