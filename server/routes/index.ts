const router = require('express').Router();
import productRoutes from './product.route';
import cartRoutes from './cart.route';
const { isAuthorized } = require('../middlewares/auth');

router.use('/product', isAuthorized, productRoutes);
router.use('/cart', isAuthorized, cartRoutes);

export default router