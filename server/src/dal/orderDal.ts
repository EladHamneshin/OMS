import orderModel from "../Schemas/OrderModel.js";
import OrderInterface from "../types/Order.js"

const addOrder = async (order: OrderInterface) => {
    const res = await orderModel.create({order});
    return res
}

const getOrdersByUserId = async (userId: string) => {
    const res = await orderModel.find({ 'order.userId': userId })
    return res

}

const getOrders = async () => {
    const res = await orderModel.find({})
    return res

}

const orderDal = { addOrder, getOrdersByUserId, getOrders }
export default orderDal