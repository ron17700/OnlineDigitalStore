import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICategory extends Document {
    name: string;
    icon: string;
    isActive: boolean;
}

const categorySchema = new Schema<ICategory>({
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
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const CategoryModel: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);

export default CategoryModel;