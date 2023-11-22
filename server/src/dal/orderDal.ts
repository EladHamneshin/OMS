import mongoose from "mongoose";
import orderModel from "../Schemas/OrderModel.js";
import OrderInterface, { ChangeStatusBody } from "../types/Order.js"
import connectToDatabase from "../configs/connectToMongogoDB.js";

const addOrder = async (order: OrderInterface): Promise<OrderInterface> => {

    await connectToDatabase();

    const { cartItems, userId, userName, userEmail, orderTime, status, totalPrice, shippingDetails } = order;
    const { address, contactNumber, orderType } = shippingDetails;
    const { city, country, zipCode, celPhone, street } = address

    const res = await orderModel.create({
        cartItems: cartItems,
        orderTime: orderTime,
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        status: status,
        totalPrice: totalPrice,
        shippingDetails: {
            address: {
                city: city,
                country: country,
                zipCode: zipCode,
                celPhone: celPhone,
                street: street
            },
            contactNumber: contactNumber,
            orderType: orderType,
        },
    });

    return res
}

const getOrdersByUserId = async (userId: string): Promise<OrderInterface | OrderInterface[]> => {

    await connectToDatabase();

    const res = await orderModel.find({ 'shippingDetails.userId': userId })
    return res

}

const getOrders = async (): Promise<OrderInterface | OrderInterface[]> => {

    await connectToDatabase();

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

const orderDal = { addOrder, getOrdersByUserId, getOrders, updateOrders }
export default orderDal