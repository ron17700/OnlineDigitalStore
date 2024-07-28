import { Request, Response, NextFunction } from 'express';
import ProductService from "../services/product.service";

interface ProductController {
    getProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getProducts(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    createProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    updateProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    deleteProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

const ProductController: ProductController = {
    async getProduct(req, res, next) {
        try {
            const { productId } = req.params;
            const product = await ProductService.getProduct(productId);
            return res.json(product);
        } catch (error) {
            next(error);
        }
    },
    async getProducts(req, res, next) {
        try {
            const products = await ProductService.getProducts();
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
    async updateProduct(req, res, next) {
        try {
            const { productId } = req.params;
            const updatedProduct = await ProductService.updateProduct(productId, req.body);
            return res.json(updatedProduct);
        } catch (ex) {
            next(ex);
        }
    },
    async deleteProduct(req, res, next) {
        try {
            const { productId } = req.params;
            await ProductService.deleteProduct(productId);
            return res.json({ message: 'Product deleted successfully!' });
        } catch (ex) {
            next(ex);
        }
    },
};

export default ProductController;