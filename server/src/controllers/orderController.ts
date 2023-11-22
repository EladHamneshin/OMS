import { Request, Response } from "express"
import orderServices from '../services/orderServices.js'

const addOrder = async (req: Request, res: Response) => {

    try {
        const order = await orderServices.addOrder(req.body)
        res.status(200).json(order)
    }
    catch (errer) {
        const errorMessage: string = errer instanceof Error ? errer.message : "An error occurred";
        res.status(401).json({ errer: errorMessage })
    }

}

const getOrdersByUserId = async (req: Request, res: Response) => {

    const userId = req.params.userId

    try {
        const orders = await orderServices.getOrdersByUserId(userId)
        res.status(200).json(orders)
    }
    catch (errer) {
        const errorMessage: string = errer instanceof Error ? errer.message : "An error occurred";
        res.status(401).json({ err: errorMessage })
    }

}

const getOrders = async (req: Request, res: Response) => {


    try {
        const orders = await orderServices.getOrders()
        res.status(200).json(orders)
    }
    catch (errer) {
        const errorMessage: string = errer instanceof Error ? errer.message : "An error occurred";
        res.status(401).json({ err: errorMessage })
    }

}
const orderController = { addOrder, getOrdersByUserId, getOrders }
export default orderController