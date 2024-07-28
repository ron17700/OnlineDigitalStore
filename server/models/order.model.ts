import mongoose, { Schema, Document, Model } from 'mongoose';
import {ICartItem} from "./cart.model";

export enum OrderStatus {
    Created = 'Created',
    Processing = 'Processing',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled'
}

export interface IOrder extends Document {
    user: string;
    address: Schema.Types.ObjectId
    products: ICartItem[];
    price: number;
    status: OrderStatus;
    isActive: boolean;
}

const OrderSchema = new Schema<IOrder>({
    user: {
            type: String,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    products: [
        {
            quantity: { type: Number, default: 1 },
            product: { type: Schema.Types.ObjectId, ref: 'Product' }
        }
    ],
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price should be higher than 0!']
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        required: true,
        default: OrderStatus.Created
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const OrderModel: Model<IOrder> = mongoose.model('Order', OrderSchema);

export default OrderModel;
