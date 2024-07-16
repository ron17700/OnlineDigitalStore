import { Router } from 'express';
import CartController from "../controllers/cart.controller";

const router: Router = Router();

router.get('/', CartController.getCart);
router.post('/', CartController.createCart);
router.put('/', CartController.updateCart);
router.delete('/', CartController.deleteCart);

export default router;
