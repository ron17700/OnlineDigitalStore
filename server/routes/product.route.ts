import { Router } from 'express';
import ProductController from "../controllers/product.controller";

const router: Router = Router();

router.get('/:productId', ProductController.getProduct);
router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.createProduct);

export default router;
