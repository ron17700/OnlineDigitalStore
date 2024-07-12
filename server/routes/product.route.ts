import { Router } from 'express';
import productController from "../controllers/product.controller";

const router: Router = Router();

router.get('/:productId', productController.getProduct);
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

export default router;
