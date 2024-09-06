import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router: Router = Router();

router.get("/permission", AuthController.getPermissions);

export default router;
