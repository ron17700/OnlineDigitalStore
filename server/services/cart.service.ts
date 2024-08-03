import CartModel, {ICart} from '../models/cart.model';
import ProductModel, {IProduct} from "../models/product.model";

const CartService = {
    async getCart(userId: string){
        let userCart: any = await CartModel.findOne({ user: userId })
            .populate('products.product')
            .lean()
            .exec();

        if (!userCart) {
            userCart = await this.createCart(userId);
        }
        return userCart;
    },
    async createCart(userId: string) {
        const cart = await CartModel.findOne({ user: userId });
        if (cart) {
            throw new Error('Cart already exists!');
        }
        return await CartModel.create({ user: userId });
    },
    async deleteCart(userId: string) {
        const cart = await CartModel.findOneAndDelete({ user: userId });
        if (!cart) {
            throw new Error('Cart not found!');
        }
        return cart;
    },
    async updateCart(userId: string, isAdmin: boolean, cart: ICart): Promise<ICart | null> {
        const existingCart: ICart | null = await CartModel.findOne({ user: userId }).exec();
        if (!existingCart) {
            throw new Error('Cart not found!');
        }

        if (existingCart.user !== userId && !isAdmin) {
            throw new Error('Unauthorized!');
        }

        if (!Array.isArray(cart.products)) {
            throw new Error('Cart does not contain any products!');
        }

        for (let product of cart.products) {
            const productFromDb: IProduct | null = await ProductModel.findById(product.product._id).exec();
            if (!productFromDb) {
                throw new Error(`Product not found: ID ${product.product._id}`);
            }
            if (!productFromDb.isActive) {
                throw new Error(`Product is not active: ID ${product.product._id}`);
            }
            product.quantity = Math.min(product.quantity, productFromDb.quantity);
        }

        existingCart.products = cart.products;
        await existingCart.save();

        const updatedCart = await CartModel.findById(existingCart._id)
            .populate('products.product')
            .exec();
        if (!updatedCart) {
            throw new Error('Failed to retrieve updated cart!');
        }
        return updatedCart;
    }
};

export default CartService;
