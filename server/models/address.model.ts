import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAddress extends Document {
    user: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isActive: boolean;
}

const AddressSchema = new Schema<IAddress>({
    user: { type: String, required: true },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const AddressModel: Model<IAddress> = mongoose.model('Address', AddressSchema);
export default AddressModel;