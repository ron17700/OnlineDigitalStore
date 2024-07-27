import ProductModel, {IProduct} from '../models/product.model';
import CategoryService from "./category.service";

const ProductService = {
    async getProducts(): Promise<{ products: IProduct[] }> {
        return { products: await ProductModel.find({isActive: true}).populate('category').exec() };
    },
    async getProduct(productId: string): Promise<IProduct | null> {
        const product: any = await ProductModel.findById(productId).exec();
        if (!product) {
            throw new Error('Product not found!');
        }
        return product;
    },
    async createProduct(product: IProduct): Promise<IProduct> {
        return await ProductModel.create(product);
    },
    async updateProduct(productId: string, product: IProduct): Promise<IProduct> {
        const categoryId = product.category?.toString() || '';
        await CategoryService.getCategoryById(categoryId);

        const updatedProduct = await ProductModel.findOneAndUpdate(
            { _id: productId },
            product
        );
        if (!updatedProduct) {
            throw new Error('Product not found!');
        }

        return updatedProduct;
    },
    async deleteProduct(productId: string): Promise<IProduct> {
        const existingProduct: IProduct | null = await ProductModel.findById(productId).exec();
        if (!existingProduct) {
            throw new Error('Product not found!');
        }

        existingProduct.isActive = false;
        await existingProduct.save();

        return existingProduct;
    }
};

export default ProductService;
