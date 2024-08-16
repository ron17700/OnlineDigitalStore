import { Router } from "express";
import { isAdmin } from "../middlewares/auth";

import ProductController from "../controllers/product.controller";

const router: Router = Router();

router.get("/", ProductController.getProducts);
router.get("/by-category", isAdmin, ProductController.getTotalProductsByCategory);
router.get("/:productId", ProductController.getProduct);
router.post("/", isAdmin, ProductController.createProduct);
router.put("/:productId", isAdmin, ProductController.updateProduct);
router.delete("/:productId", isAdmin, ProductController.deleteProduct);

export default router;
