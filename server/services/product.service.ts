import ProductModel, {IProduct, IProductQuery} from '../models/product.model';
import CategoryService from "./category.service";

const ProductService = {
    async getProducts(query: IProductQuery): Promise<{ products: IProduct[] }> {
        let filter: any = { isActive: true };
        if (query.search) {
            const searchRegex = new RegExp(query.search, 'i');
            filter.$or = [
                { name: searchRegex },
                { description: searchRegex }
            ];
        }

        if (query.minPrice) {
            filter.price = { ...filter.price, $gte: Number(query.minPrice) };
        }
        if (query.maxPrice) {
            filter.price = { ...filter.price, $lte: Number(query.maxPrice) };
        }

        if (query.categoryId) {
            filter.category = query.categoryId;
        }

        if (query.inStock === 'true') {
            filter.quantity = { $gt: 0 };
        } else if (query.inStock === 'false') {
            filter.quantity = { $eq: 0 };
        }

        let productQuery = ProductModel.find(filter).populate('category');

        if (query.sortBy) {
            const sort: any = {};
            const [key, order] = query.sortBy.split(':');
            if (['name', 'price'].includes(key) && ['asc', 'desc'].includes(order)) {
                sort[key] = order === 'desc' ? -1 : 1;
                productQuery = productQuery.sort(sort);
            }
        }

        return { products: await productQuery.exec()};
    },
    async getProductsGroupByCategory() {
        return ProductModel.aggregate([
            {$match: {isActive: true}},
            {
                $group: {
                    _id: '$category',
                    totalProducts: { $sum: 1 }
                }
            }
        ]);
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
