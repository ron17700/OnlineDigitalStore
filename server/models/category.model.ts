import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICategory extends Document {
    name: string;
    icon: string;
    isActive: boolean;
}

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        unique: true,
        required: [true, 'Category name should not be empty!'],
        minlength: [1, 'Category name should not be empty!']
    },
    icon: {
        type: String,
        default: 'defaultCategoryIcon'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const CategoryModel: Model<ICategory> = mongoose.model('Category', CategorySchema);

export default CategoryModel;