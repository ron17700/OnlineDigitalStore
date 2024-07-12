const router = require('express').Router();
import productRoutes from './product.route';

router.use('/product', productRoutes);

export default router