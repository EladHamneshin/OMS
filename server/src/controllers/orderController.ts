import { Request, Response } from "express"
import orderServices from '../services/orderServices'

const addOrder = async (req: Request, res: Response) => {

    try {
        const order = await orderServices.addOrder(req.body)
        res.status(200).json(order)
    }
    catch (err) {
        const errorMessage: string = err instanceof Error ? err.message : "An error occurred";
        res.status(401).json({ err: errorMessage })
    }

}
const orderController = { addOrder }
export default orderController