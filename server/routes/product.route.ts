import { Router } from 'express';
const { isAdmin} = require('../middlewares/auth');

import ProductController from "../controllers/product.controller";

const router: Router = Router();

router.get('/', ProductController.getProducts);
router.get('/grouped-by-category', ProductController.getProductsGroupByCategory);
router.get('/:productId', ProductController.getProduct);
router.post('/', isAdmin, ProductController.createProduct);
router.put('/:productId', isAdmin, ProductController.updateProduct);
router.delete('/:productId', isAdmin, ProductController.deleteProduct);

export default router;
