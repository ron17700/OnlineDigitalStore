const router = require('express').Router();
import productRoutes from './product.route';
const { isAuthorized } = require('../middlewares/auth');

router.use('/product', isAuthorized, productRoutes);

export default router