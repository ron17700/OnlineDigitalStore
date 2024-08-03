import { Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";

export const isAuthorized = (req: any, res: Response, next: NextFunction) => {
  const checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: "RS256",
  });

  checkJwt(req, res, (error: any) => {
    if (error) {
      if (error.name === "UnauthorizedError") {
        res
          .status(401)
          .json({ message: "Invalid token or no token provided." });
      } else {
        next(error);
      }
    } else {
      const { sub } = req.auth?.payload;
      req.userId = sub;
      req.isAdmin = req.auth?.payload.permissions.indexOf("admin") !== -1;
      next();
    }
  });
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.isAdmin) {
    return next();
  }
  res.status(401).json({ message: "Access denied. Admins only." });
};
