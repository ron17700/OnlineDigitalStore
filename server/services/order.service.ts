import { ICartItem } from '../models/cart.model';
import ProductModel, { IProduct } from "../models/product.model";
import OrderModel, { IOrder, OrderStatus } from "../models/order.model";
import AddressService from './address.service';
import CartService from "./cart.service";
import mongoose from "mongoose";

const OrderService = {
    async getOrderById(orderId: string, userId: string, isAdmin: boolean) {
        const existingOrder: IOrder | null = await OrderModel.findById(orderId).populate('address products.product').exec();
        if (!existingOrder) {
            throw new Error('Order not found!');
        }

        if (existingOrder.user !== userId && !isAdmin) {
            throw new Error('Unauthorized!');
        }
        return existingOrder;

    },
    async getOrders(userId: string, isAdmin: boolean) {
        if (isAdmin) {
            return OrderModel.find({isActive: true}).populate('address products.product').exec();
        }
        return OrderModel.find({ user: userId, isActive: true}).populate('address products.product').exec();
    },
    async createOrder(userId: string, isAdmin: boolean, order: IOrder) {
        const addressId = order.address?.toString() || '';
        const existingAddress = await AddressService.getAddressById(addressId, userId, isAdmin);

        const totalQuantity = order.products
            .map(product => product.quantity)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        if (!Array.isArray(order.products) || totalQuantity < 1) {
            throw new Error('Invalid products!');
        }

        const newOrder: IOrder = new OrderModel({
            user: userId,
            address: existingAddress._id,
            products: order.products
        });
        return this.withTransaction(async (session) => {
            await this.checkAndDeductStock(newOrder.products, session);
            newOrder.price = await this.calculateTotalPrice(newOrder.products, session);
            await CartService.deleteCart(userId, { session });
            return await newOrder.save({ session });
        });
    },
    async updateOrder(orderId: string, userId: string, isAdmin: boolean, order: any) {
        return this.withTransaction(async (session) => {
            const existingOrder: any = await OrderModel.findById(orderId).session(session).exec();
            if (!existingOrder) {
                throw new Error('Order not found!');
            }

            if (existingOrder.user !== userId && !isAdmin) {
                throw new Error('Unauthorized!');
            }

            const addressId = order.address?._id?.toString() || '';
            const existingAddress = await AddressService.getAddressById(addressId, userId, isAdmin);
            const isCancelRequest = order.status === OrderStatus.Cancelled && existingOrder.status === OrderStatus.Created;
            if (!isAdmin && !isCancelRequest) {
                throw new Error('Cannot update order after it has been processed!');
            }

            const isValidStatus = Object.values(OrderStatus).includes(order.status);
            if (!isValidStatus) {
                throw new Error('Invalid status!');
            }

            const totalQuantity = (order.products as ICartItem[])
                .map(product => product.quantity)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            if (!Array.isArray(order.products) || totalQuantity < 1) {
                throw new Error('Invalid products!');
            }
            await this.restoreStock(existingOrder.products, session);
            if (!isCancelRequest) {
                await this.checkAndDeductStock(order.products, session);
            }

            if (isAdmin) {
                existingOrder.address = existingAddress._id;
                existingOrder.products = order.products;
                existingOrder.price = await this.calculateTotalPrice(order.products, session);
            }
            existingOrder.status = order.status;

            return await existingOrder.save({ session });
        });
    },
    async deleteOrder(orderId: string, userId: string, isAdmin: boolean) {
        return this.withTransaction(async (session) => {
            const order: IOrder | null = await OrderModel.findById(orderId).session(session).exec();
            if (!order) {
                throw new Error('Order not found!');
            }
    
            if (order.status !== OrderStatus.Cancelled) {
                throw new Error('Order must be canceled before deletion!');
            }
    
            if (order.user !== userId && !isAdmin) {
                throw new Error('Unauthorized!');
            }
    
            order.isActive = false;
            await order.save({session});
        });
    },
    async getSalesOverTime() {
        return OrderModel.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    },
                    totalRevenue: { $sum: '$price' },
                    totalOrders: { $sum: 1 },
                },
            },
            {
                $sort: { '_id.date': 1 },
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id.date',
                    totalRevenue: 1,
                    totalOrders: 1,
                },
            },
        ]);
    },
    async withTransaction<T>(callback: (session: mongoose.ClientSession) => Promise<T>): Promise<T> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const result = await callback(session);
            await session.commitTransaction();
            return result;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }
    },
    async checkAndDeductStock(products: ICartItem[], session: mongoose.ClientSession) {
        for (const product of products) {
            const productFromDb: IProduct | null = await ProductModel.findById(product.product._id).session(session).exec();
            if (!productFromDb) {
                throw new Error(`Product not found: ID ${product.product._id}`);
            }
            if (!productFromDb.isActive) {
                throw new Error(`Product is not active: ID ${product.product._id}`);
            }
            if (productFromDb.quantity < product.quantity) {
                throw new Error(`Not enough stock for product ${product.product.name}`);
            }
            productFromDb.quantity -= product.quantity;
            await productFromDb.save({ session });
        }
    },
    async restoreStock(products: ICartItem[], session: mongoose.ClientSession) {
        for (const product of products) {
            await ProductModel.findByIdAndUpdate(product.product._id, {
                $inc: { quantity: product.quantity }
            }).session(session).exec();
        }
    },
    async calculateTotalPrice(products: ICartItem[], session: mongoose.ClientSession): Promise<number> {
        let total = 0;
        for (const product of products) {
            const productFromDb: IProduct | null = await ProductModel.findById(product.product._id).session(session).exec();
            if (!productFromDb) {
                throw new Error(`Product with id ${product.product._id} not found`);
            }
            total += productFromDb.price * product.quantity;
        }
        return total;
    }
};

export default OrderService;
