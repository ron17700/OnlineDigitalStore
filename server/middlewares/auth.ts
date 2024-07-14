import { Request, Response, NextFunction } from 'express';
import {auth, claimIncludes} from "express-oauth2-jwt-bearer";

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const checkJwt = auth({
        audience: process.env.AUTH0_AUDIENCE,
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
        tokenSigningAlg: 'RS256'
    });

    checkJwt(req, res, (error: any) => {
        if (error) {
            if (error.name === 'UnauthorizedError') {
                res.status(401).json({ message: 'Invalid token or no token provided.' });
            } else {
                next(error);
            }
        } else {
            next();
        }
    });
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const checkClaims = claimIncludes('role', 'admin');

    checkClaims(req, res, (error: any) => {
        if (error) {
            if (error.name === 'InvalidTokenError') {
                res.status(401).json({ message: 'Access denied. Admins only.' });
            } else {
                next(error);
            }
        } else {
            next();
        }
    });
}

module.exports = {isAuthorized, isAdmin};