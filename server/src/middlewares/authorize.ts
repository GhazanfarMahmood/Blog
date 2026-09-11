import { Response, NextFunction } from "express";
import { AuthRequest } from "./verifyToken";

const authorize = (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    if(!req.user) {
        return res.status(401).json({
            message : "Unauthorized",
        });
    }

    if(!roles.includes(req.user.role)) {
        return res.status(403).json({
            message: "You do not have permission to perform this action.",
        });
    }

    next();
};

export default authorize;