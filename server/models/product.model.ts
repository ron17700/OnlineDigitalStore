import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    reviews: string;
    stars: string;
    category: Schema.Types.ObjectId;
    isActive: boolean;
}

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, 'Product name is required!'],
        minLength: [1, 'Product name should not be empty!']
    },
    description: {
        type: String,
        required: [true, 'Product description is required!'],
        minLength: [1, 'Product description should not be empty!']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required!'],
        min: [0, 'Price should be higher than 0!']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required!'],
        min: [0, 'Product quantity should be higher than 0!']
    },
    image: {
        type: String,
        required: [true, 'Product name is required!'],
        minLength: [1, 'Product name should not be empty!']
    },
    reviews: {
        type: String,
        required: [true, 'Product reviews is required!'],
        minLength: [1, 'Product reviews should not be empty!']
    },
    stars: {
        type: String,
        required: [true, 'Product stars is required!'],
        minLength: [1, 'Product stars should not be empty!']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const ProductModel: Model<IProduct> = mongoose.model('Product', ProductSchema);

export default ProductModel;
