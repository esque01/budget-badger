import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token-helper";


const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.cookies['session_token'];
        if (token && verifyToken(token)) {
            res.json({ isAuthenticated: true });
        }
        else {
            res.json({ isAuthenticated: false });
        }
    } 
    catch (error) {
        next(error);
    }
};


export { checkAuth };