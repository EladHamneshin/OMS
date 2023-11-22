import mongoose from "mongoose";
import orderModel from "../Schemas/OrderModel.js";
import OrderInterface, { ChangeStatusBody } from "../types/Order.js"
import connectToDatabase from "../configs/connectToMongogoDB.js";

const addOrder = async (order: OrderInterface) => {
    const res = await orderModel.create({order});
    return res
}

const getOrdersByUserId = async (userId: string) => {
    const res = await orderModel.find({ 'order.userId': userId })
}

const getOrders = async () => {
    const res = await orderModel.find({})
    return res
}

const updateOrders = async (
    orderId: mongoose.Types.ObjectId,
    newStatus: ChangeStatusBody
): Promise<OrderInterface | OrderInterface[] | null> => {

    await connectToDatabase();

    const filter = { _id: orderId }
    const updateStatus = { status: newStatus.status }
    const res = await orderModel.findByIdAndUpdate(filter, updateStatus, {
        new: true
    })
    return res
}

export default { addOrder, getOrdersByUserId, getOrders, updateOrders }