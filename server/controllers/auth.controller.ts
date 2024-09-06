import { Response, NextFunction } from "express";
import AuthService from "../services/auth.service";

interface AuthController {
  getPermissions(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}

const AuthController: AuthController = {
  async getPermissions(req, res, next) {
    try {
      const permissions = await AuthService.getPermissions(req.auth);
      res.status(200).json(permissions);
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
