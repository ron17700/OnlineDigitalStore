import {Response, NextFunction} from 'express';
import OrderService from "../services/order.service";

interface OrderController {
    getOrderById(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    getOrders(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    createOrder(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    updateOrder(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    deleteOrder(req: any, res: Response, next: NextFunction): Promise<Response | void>;
}

const OrderController: OrderController = {
    async getOrderById(req, res, next) {
        try {
            const {orderId} = req.params;
            const order = await OrderService.getOrderById(orderId, req.userId, req.isAdmin);
            res.status(200).json(order);
        } catch (error) {
            next(error)
        }
    },
    async getOrders(req, res, next) {
        try {
            const orders = await OrderService.getOrders(req.userId, req.isAdmin);
            res.status(200).json(orders);
        } catch (error) {
            next(error)
        }
    },

    async createOrder(req, res, next) {
        try {
            const order = await OrderService.createOrder(req.userId, req.isAdmin, req.body);
            res.status(201).json(order);
        } catch (error) {
            next(error)
        }
    },

    async updateOrder(req, res, next) {
        try {
            const {orderId} = req.params;
            const order = await OrderService
                .updateOrder(orderId, req.userId, req.isAdmin, req.body);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    },

    async deleteOrder(req, res, next) {
        try {
            const {orderId} = req.params;
            await OrderService.deleteOrder(orderId);
            res.status(200).json({message: 'Order deleted successfully'});
        } catch (error) {
            next(error);
        }
    }
};

export default OrderController;