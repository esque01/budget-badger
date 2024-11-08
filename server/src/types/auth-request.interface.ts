import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    decoded?: JwtPayload | string;
}