import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import orderServices from '../services/orderServices.js';
import RequestError from "../utils/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";



// Add order Controller func
const addOrder = asyncHandler(async (req: Request, res: Response) => {
    const order = await orderServices.addOrder(req.body)
    if (!order) {
        throw new RequestError("Server error, please try again", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    res.status(STATUS_CODES.CREATED).json(order)
})

// Get all orders by userId order Controller func
const getOrdersByUserId = asyncHandler(async (req: Request, res: Response) => {
  
    const userId = req.params.userId;
    if (!userId) {
        throw new RequestError("userId is required", STATUS_CODES.BAD_REQUEST);
    }

    const orders = await orderServices.getOrdersByUserId(userId);
    if (!orders) {
        throw new RequestError("Server error, please try again", STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    res.status(STATUS_CODES.OK).json(orders);
})

// Get all orders Controller func
const getOrders = asyncHandler(async (req: Request, res: Response) => {

    const orders = await orderServices.getOrders();
    if (!orders) {
        throw new RequestError("Server error, please try again", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    
    res.status(STATUS_CODES.OK).json(orders)
})

// Update order Controller func
const updateOrder = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    if (!orderId) {
        throw new RequestError("orderId params is required", STATUS_CODES.BAD_REQUEST)
    }
    const changeOrderBody = req.body;
    if (!changeOrderBody) {
        throw new RequestError("Body is required", STATUS_CODES.BAD_REQUEST)
    }
    const isAdmin = req.isAdmin;
    const response = await orderServices.updateOrder(orderId, isAdmin!, changeOrderBody)
    if (!response) {
        throw new RequestError("Server error, please try again", STATUS_CODES.BAD_REQUEST)
    }
    res.status(STATUS_CODES.OK).json(response)
})

export default { addOrder, getOrdersByUserId, getOrders, updateOrder }


