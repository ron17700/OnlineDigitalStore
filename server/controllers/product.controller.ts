import { Request, Response, NextFunction } from 'express';
import ProductService from "../services/product.service";

interface ProductController {
    getProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getAllProducts(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    createProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

const ProductController: ProductController = {
    async getProduct(req, res, next) {
        try {
            const { productId } = req.params;
            const product = await ProductService.getProduct(productId);
            if (!product) {
                const error = new Error('Product not found') as Error & { status: number };
                error.status = 404;
                next(error);
                return;
            }
            return res.json(product);
        } catch (error) {
            next(error);
        }
    },
    async getAllProducts(req, res, next) {
        try {
            const products = await ProductService.getAllProducts();
            return res.json(products);
        } catch (error) {
            next(error);
        }
    },
    async createProduct(req, res, next) {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            return res.json(newProduct);
        } catch (error) {
            next(error);
        }
    },
};

export default ProductController;