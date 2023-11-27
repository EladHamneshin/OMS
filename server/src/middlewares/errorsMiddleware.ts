import { Request, Response, NextFunction } from 'express';
import {Error as MongooseError} from 'mongoose';
import STATUS_CODES from '../utils/StatusCodes.js';
import RequestError from '../types/errors/RequestError.js';
import MiddlewareError from '../types/errors/MiddlewareError.js';


const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(STATUS_CODES.NOT_FOUND);
  console.log('not found');
  next(error);
};


const errorHandler = (error: MiddlewareError ,_req: Request, res: Response, _next: NextFunction) => {
  let statusCode = res.statusCode === STATUS_CODES.OK ? STATUS_CODES.INTERNAL_SERVER_ERROR : res.statusCode;
  let message = error.message;

  if (error instanceof RequestError) {
    statusCode = error.statusCode;
  }

  // If Mongoose validation error, set to 400 and change message
  if (error instanceof MongooseError.ValidationError) {
    statusCode = STATUS_CODES.BAD_REQUEST;
    message = 'Invalid data';
  }

  // If Mongoose not found error, set to 404 and change message
  if (error instanceof MongooseError.CastError && error.kind === 'ObjectId') {
    statusCode = STATUS_CODES.NOT_FOUND;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    stack: error.stack,
  });
};

export { notFound, errorHandler };