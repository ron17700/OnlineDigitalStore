import { Router } from "express";
import { isAdmin } from "../middlewares/auth";

import CategoryController from "../controllers/category.controller";

const router: Router = Router();

router.get("/", CategoryController.getCategories);
router.get("/:categoryId", CategoryController.getCategoryById);
router.post("/", isAdmin, CategoryController.createCategory);
router.put("/:categoryId", isAdmin, CategoryController.updateCategory);
router.delete("/:categoryId", isAdmin, CategoryController.deleteCategory);

export default router;
