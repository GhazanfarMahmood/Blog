import { NextFunction, Response } from "express"
import { AuthRequest } from "./verifyToken"

export const requireRole = (...allowedRoles: String[]) => {
    return (req : AuthRequest, res : Response, next : NextFunction) => {
        if(!req.user) {
            return res.status(401).json({
                message : "Unauthorized",
            });
        }

        if(!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message : "Forbidden. You do not have permission.",
            });
        }

        next();
    };
};