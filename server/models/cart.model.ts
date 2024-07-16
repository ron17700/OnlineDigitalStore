import {IProduct} from "./product.model";
import mongoose, {Model, Schema, Document} from "mongoose";

export interface ICartItem {
    quantity: number;
    product: IProduct;
}

export interface ICart extends Document {
    products: ICartItem[];
    user: string;
}

const CartSchema = new Schema<ICart>({
    products: [
        {
            quantity: { type: Number, default: 1 },
            product: { type: Schema.Types.ObjectId, ref: 'Product' }
        }
    ],
    user: { type: String, unique: true, required: true }
}, {
    timestamps: true
});
const CartModel: Model<ICart> = mongoose.model('Cart', CartSchema);
export default CartModel;