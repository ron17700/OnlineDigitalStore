import { Request, Response, NextFunction } from 'express';
import productService from "../services/product.service";

interface ProductController {
    getProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getAllProducts(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    createProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

const productController: ProductController = {
    async getProduct(req, res, next) {
        try {
            const { productId } = req.params;
            const product = await productService.getProduct(productId);
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
            const products = await productService.getAllProducts();
            return res.json(products);
        } catch (error) {
            next(error);
        }
    },
    async createProduct(req, res, next) {
        try {
            const newProduct = await productService.createProduct(req.body);
            return res.json(newProduct);
        } catch (error) {
            next(error);
        }
    },
};

export default productController;