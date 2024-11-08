import { NextFunction, Response } from "express";
import { verifyToken } from "../utils/token-helper";
import { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types/auth-request.interface";


export const authRequired = (req: AuthRequest, res: Response, next: NextFunction): void => { 

    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: "Unauthorized: Token or secret key missing" });
        return;
    } 
    
    const decodedToken: JwtPayload | null = verifyToken(token);
    
    if (!decodedToken) {
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }

    req.decoded = decodedToken;

    next();
};