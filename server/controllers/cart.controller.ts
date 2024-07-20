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
            const userId = req.userId;
            const cart = await CartService.getCart(userId);
            if (!cart) {
                const error = new Error('Cart not found') as Error & { status: number };
                error.status = 404;
                next(error);
                return;
            }
            res.json(cart);
        } catch (error) {
            next(error);
        }
    },
    async createCart(req, res, next) {
        try {
            const userId = req.userId;
            const cart = await CartService.createCart(userId);
            res.json(cart);
        } catch (error) {
            next(error);
        }
    },
    async updateCart(req, res, next) {
        try {
            const userId = req.userId;
            const cart = await CartService.updateCart(userId, req.body);
            return res.json(cart);
        } catch (error) {
            next(error);
        }
    },
    async deleteCart(req, res, next) {
        try {
            const userId = req.userId;
            await CartService.deleteCart(userId);
            return res.json({ message: 'Cart deleted successfully!' });
        } catch (error) {
            next(error);
        }
    }
};

export default CartController;