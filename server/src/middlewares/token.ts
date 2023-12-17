import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import RequestError from "../types/errors/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";


export const createToken = (email: string, isAdmin: boolean) => {
  if (process.env.JWT_SECRET) {
    const user = { email: email, isAdmin: isAdmin };
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2d' });
  } else {
    throw new RequestError("ACCESS_TOKEN_SECRET is not defined", STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};

export const autoToken = async (token: string) => {
  if (!token) {
    throw new RequestError('Not authorized, no token', STATUS_CODES.UNAUTHORIZED);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);    
    const isAdmin = (decoded as JwtPayload).isAdmin;
  return isAdmin
  } catch (err) {
    console.error(err);
    throw new RequestError('Not authorized, token failed', 403);
  }
}





