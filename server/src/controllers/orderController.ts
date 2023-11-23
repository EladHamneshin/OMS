import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import orderServices from '../services/orderServices.js'
import mongoose, { Error } from "mongoose"
import { ChangeOrderBody, OrderStatusEnum } from "../types/Order.js"
import RequestError from "../utils/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js"

// Add order Controller func
const addOrder = asyncHandler(async (req: Request, res: Response) => {

    const order = await orderServices.addOrder(req.body)
    if (!order) {
        throw new RequestError("Server error, please try again", STATUS_CODES.INTERNAL_SERVER_RRROR)
    }
    res.status(STATUS_CODES.CREATED).json(order)
})

// Get all orders by userId order Controller func
const getOrdersByUserId = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.params.userId
    if (!userId) {
        throw new RequestError("userId is reqaed", STATUS_CODES.BAD_REQUEST)
    }

    const orders = await orderServices.getOrdersByUserId(userId)
    if (!orders) {
        throw new RequestError("Server error, please try again", STATUS_CODES.INTERNAL_SERVER_RRROR)
    }
    res.status(STATUS_CODES.OK).json(orders)
})

// Get all orders Controller func
const getOrders = asyncHandler(async (req: Request, res: Response) => {

    const orders = await orderServices.getOrders()
    if (!orders) {
        throw new RequestError("Server error, please try again", STATUS_CODES.INTERNAL_SERVER_RRROR)
    }
    res.status(STATUS_CODES.OK).json(orders)
})

// Update order Controller func
// const updateOrder = asyncHandler(async (req: Request, res: Response) => {

//     const orderId = req.params.orderId as unknown as mongoose.Types.ObjectId
//     if (!orderId) {
//         throw new RequestError("orderId params is reqaed", STATUS_CODES.BAD_REQUEST)
//     }

//     const changeOrderBody = req.body as unknown as ChangeOrderBody
//     if (!changeOrderBody) {
//         throw new RequestError("Body is reqaed", STATUS_CODES.BAD_REQUEST)
//     }

//     const response = await orderServices.updateOrder(orderId, changeOrderBody)
//     if (!response) {
//         throw new RequestError("Server error, please try again", STATUS_CODES.INTERNAL_SERVER_RRROR)
//     }
//     res.status(STATUS_CODES.OK).json(response)

// })


export default orderController { addOrder, getOrdersByUserId, getOrders}
