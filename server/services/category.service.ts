import CategoryModel, {ICategory} from "../models/category.model";
import categoryModel from "../models/category.model";

const CategoryService = {
    async getCategoryById(categoryId: string) {
        const existingCategory: ICategory | null = await CategoryModel.findById(categoryId).exec();
        if (!existingCategory) {
            throw new Error('Category not found!');
        }

        return existingCategory;
    },
    async getCategoryByName(categoryName: string) {
        const existingCategory: ICategory | null = await CategoryModel.findOne({ name: categoryName });
        if (!existingCategory) {
            throw new Error('Category not found!');
        }

        return existingCategory;
    },
    async getCategories() {
        return await CategoryModel.find({isActive: true}).exec();
    },
    async createCategory(category: ICategory) {
        return await CategoryModel.create(category);
    },
    async updateCategory(categoryId: string, category: ICategory) {
        const updatedCategory = await categoryModel.findOneAndUpdate(
            { _id: categoryId },
            category,
            {new: true}
        );
        if (!updatedCategory) {
            throw new Error('Category not found!');
        }

        return updatedCategory;
    },
    async deleteCategory(categoryId: string) {
        const existingCategory: ICategory | null = await categoryModel.findById(categoryId).exec();
        if (!existingCategory) {
            throw new Error('Category not found!');
        }

        existingCategory.isActive = false;
        await existingCategory.save();
    }
};

export default CategoryService;
