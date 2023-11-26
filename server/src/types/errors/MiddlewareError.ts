import {Error as MongooseError} from 'mongoose';
import RequestError from './RequestError.js';

type MiddlewareError = MongooseError | Error | RequestError;

export default MiddlewareError;