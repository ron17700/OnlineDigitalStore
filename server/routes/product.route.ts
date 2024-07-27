import { Router } from 'express';
const { isAdmin} = require('../middlewares/auth');

import ProductController from "../controllers/product.controller";

const router: Router = Router();

router.get('/:productId', ProductController.getProduct);
router.get('/', ProductController.getProducts);
router.post('/', isAdmin, ProductController.createProduct);
router.put('/:productId', isAdmin, ProductController.updateProduct);
router.delete('/:productId', isAdmin, ProductController.deleteProduct);

export default router;
