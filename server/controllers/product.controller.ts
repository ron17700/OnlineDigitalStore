import { Request, Response, NextFunction } from 'express';
import ProductService from "../services/product.service";
import {IProductQuery} from "../models/product.model";

interface ProductController {
    getProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getProducts(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    getTotalProductsByCategory(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
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
            const products = await ProductService.getProducts(req.query as IProductQuery);
            return res.json(products);
        } catch (error) {
            next(error);
        }
    },
    async getTotalProductsByCategory(req, res, next) {
        try {
            const products = await ProductService.getTotalProductsByCategory();
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
        } catch (error) {
            next(error);
        }
    },
    async deleteProduct(req, res, next) {
        try {
            const { productId } = req.params;
            await ProductService.deleteProduct(productId);
            return res.json({ message: 'Product deleted successfully!' });
        } catch (error) {
            next(error);
        }
    },
};

export default ProductController;