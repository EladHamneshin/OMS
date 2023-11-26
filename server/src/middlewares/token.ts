import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const createToken = (email: string, admin: boolean) => {
    if (process.env.ACCESS_TOKEN_SECRET) {

        const userEmail = { email, admin };
        return jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET);        
    } else {
        throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }
};

export const autoToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token as string | undefined;
    if (!token) return res.send('not found a token')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
        if (err) return res.status(403).send('you need a token')

        next()
    })
}