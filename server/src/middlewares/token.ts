import { Request, Response ,NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const createToken = (email: string) => {
    if (process.env.ACCESS_TOKEN_SECRET) {
        const userEmail = { email: email };
        // console.log(process.env.ACCESS_TOKEN_SECRET);
        
        return jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET);
    } else {
        throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }
};

export const autoToken = (req:Request,res:Response,next:NextFunction) =>{
    const token: string | undefined = req.headers.token as string | undefined;
    if (!token) return res.send('not found a token')
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET!,(err,user)=>{
        if(err) return res.status(403).send('you need a token')
        console.log(user);
        next()
    })
}