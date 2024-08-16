import { Router } from "express";
import { isAdmin } from "../middlewares/auth";

import OrderController from "../controllers/order.controller";

const router: Router = Router();

router.get("/", OrderController.getOrders);
router.get("/sales", isAdmin, OrderController.getSalesOverTime);
router.get("/:orderId", OrderController.getOrderById);
router.post("/", OrderController.createOrder);
router.put("/:orderId", OrderController.updateOrder);
router.delete("/:orderId", isAdmin, OrderController.deleteOrder);

export default router;
