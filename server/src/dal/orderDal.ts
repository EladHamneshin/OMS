import mongoose from "mongoose";
import orderModel from "../models/OrderModel.js";
import OrderInterface, {  OrderEnum, OrderStatusEnum } from "../types/Order.js"
// import ProductsQuantities, { Action } from "../types/ProductsQuantities.js";

const addOrder = async (order: OrderInterface) => {
    const res = await orderModel.create(order);

    if (res.shippingDetails.orderType !== OrderEnum.SelfCollection) {
        setTimeout(async () => {
            const updatedOrder = await orderModel.findByIdAndUpdate(
                res._id,
                { $set: { status: OrderStatusEnum.Sent } },
            );
        }, 1000000);
        const delayToArrivedMilliseconds = getDelayToArrivedMilliseconds(order.shippingDetails.orderType);
        setTimeout(async () => {
            const arrivedOrder = await orderModel.findByIdAndUpdate(
                res._id,
                { $set: { status: OrderStatusEnum.Received } },
            );
        }, delayToArrivedMilliseconds);
    }

    return "The order has been successfully added";
};


const getDelayToArrivedMilliseconds = (orderType: OrderEnum) => {
    if (OrderEnum.Express) {
        return 15000000;
    }
    return 20000000;
}


const getOrdersByUserId = async (userId: string): Promise<OrderInterface[]> => {
    const res = await orderModel.find({ 'order.userId': userId })
    return res
}

const getOrders = async () => {
    const res = await orderModel.find({})
    return res
}


const updateOrder = async (orderId: string, updatedFields: Partial<OrderInterface>) => {    
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { $set: updatedFields }, { new: true });   
     
    return updatedOrder;
};

export default { addOrder, getOrdersByUserId, getOrders, updateOrder}
