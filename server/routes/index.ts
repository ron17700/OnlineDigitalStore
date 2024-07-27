const router = require('express').Router();
import productRoutes from './product.route';
import cartRoutes from './cart.route';
import scrapingRoutes from './scraping.route';
const { isAuthorized } = require('../middlewares/auth');

router.use('/product', isAuthorized, productRoutes);
router.use('/cart', isAuthorized, cartRoutes);
router.use('/scraping', isAuthorized, scrapingRoutes);

export default router