import { Response, NextFunction } from 'express';
import CartService from "../services/cart.service";

interface CartController {
    getCart(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    createCart(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    updateCart(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    deleteCart(req: any, res: Response, next: NextFunction): Promise<Response | void>;
}

const CartController: CartController = {
    async getCart(req, res, next) {
        try {
            const cart = await CartService.getCart(req.userId);
            res.json(cart);
        } catch (error) {
            next(error);
        }
    },
    async createCart(req, res, next) {
        try {
            const cart = await CartService.createCart(req.userId);
            res.json(cart);
        } catch (error) {
            next(error);
        }
    },
    async updateCart(req, res, next) {
        try {
            const cart = await CartService.updateCart(req.userId, req.isAdmin, req.body);
            return res.json(cart);
        } catch (error) {
            next(error);
        }
    },
    async deleteCart(req, res, next) {
        try {
            await CartService.deleteCart(req.userId);
            return res.json({ message: 'Cart deleted successfully!' });
        } catch (error) {
            next(error);
        }
    }
};

export default CartController;