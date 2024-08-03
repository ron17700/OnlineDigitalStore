import {Response, NextFunction} from 'express';
import CategoryService from "../services/category.service";

interface CategoryController {
    getCategories(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    getCategoryById(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    createCategory(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    updateCategory(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    deleteCategory(req: any, res: Response, next: NextFunction): Promise<Response | void>;
}

const CategoryController: CategoryController = {
    async getCategoryById(req, res, next) {
        try {
            const {categoryId} = req.params;
            const category = await CategoryService.getCategoryById(categoryId);
            res.status(200).json(category);
        } catch (error) {
            next(error)
        }
    },
    async getCategories(req, res, next) {
        try {
            const categories = await CategoryService.getCategories();
            res.status(200).json(categories);
        } catch (error) {
            next(error)
        }
    },

    async createCategory(req, res, next) {
        try {
            const category = await CategoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            next(error)
        }
    },

    async updateCategory(req, res, next) {
        try {
            const {categoryId} = req.params;
            const category = await CategoryService.updateCategory(categoryId, req.body);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    },

    async deleteCategory(req, res, next) {
        try {
            const {categoryId} = req.params;
            await CategoryService.deleteCategory(categoryId);
            res.status(200).json({message: 'Category deleted successfully!'});
        } catch (error) {
            next(error);
        }
    }
};

export default CategoryController;