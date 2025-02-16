import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
    user?: { id: number };
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return; 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

        (req as AuthRequest).user = decoded;

        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
        return;
    }
};
