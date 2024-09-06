import { Router } from "express";
import productRoutes from "./product.route";
import categoryRoute from "./category.route";
import cartRoutes from "./cart.route";
import orderRoutes from "./order.route";
import addressRoute from "./address.route";
import AuthRoute from "./auth.route";

const router = Router();
router.use("/product", productRoutes);
router.use("/category", categoryRoute);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
router.use("/address", addressRoute);
router.use("/auth", AuthRoute);

export default router;
