import { Request, Response } from "express"
import orderServices from '../services/orderServices.js'
import asyncHandler from "express-async-handler";

import mongoose from "mongoose"
import { ChangeStatusBody, OrderStatusEnum } from "../types/Order.js"

const addOrder = asyncHandler(async (req: Request, res: Response) => {
    try {
        const order = await orderServices.addOrder(req.body)
        res.status(200).json(order)
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        res.status(401).json({ err: errorMessage })
    }

}
)

const getOrdersByUserId = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.userId
    try {
        const orders = await orderServices.getOrdersByUserId(userId)
        res.status(200).json(orders)
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        res.status(401).json({ err: errorMessage })
    }

}
)

const getOrders = asyncHandler(async (req: Request, res: Response) => {

    try {
        const orders = await orderServices.getOrders()
        res.status(200).json(orders)
    }
    catch (err) {
        const errorMessage= err instanceof Error ? err.message : "An error occurred";
        res.status(401).json({ err: errorMessage })
    }
}

)


const updateOrders = async (req: Request, res: Response) => {
    console.log(req.body);
    const orderId = req.params.orderId as unknown as mongoose.Types.ObjectId
    const newStatus = req.body as unknown as ChangeStatusBody

    try {
        const response = await orderServices.updateOrders(orderId, newStatus)
        res.status(200).json(response)
    }
    catch (errer) {
        const errorMessage: string = errer instanceof Error ? errer.message : "An error occurred";
        res.status(401).json({ err: errorMessage })
    }
}


export default  { addOrder, getOrdersByUserId, getOrders, updateOrders }
