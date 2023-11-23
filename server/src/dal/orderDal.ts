import mongoose from "mongoose";
import orderModel from "../Schemas/OrderModel.js";
import OrderInterface, { ChangeOrderBody } from "../types/Order.js"
import connectToDatabase from "../configs/connectToMongogoDB.js";
import serverCheckOrder from "../services/checkOrder.js";
import ProductsQuantities, { Action, ProductQuantity } from "../types/ProductsQuantities.js";
import RequestError from "../utils/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";

// Add order dal func
const addOrder = async (order: OrderInterface): Promise<OrderInterface> => {

    await connectToDatabase();

    const { cartItems, userId, userName, userEmail, orderTime, status, totalPrice, shippingDetails } = order;
    const { address, contactNumber, orderType } = shippingDetails;
    const { city, country, zipCode, street, celPhone } = address

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

// Get all orders by userId dal func
const getOrdersByUserId = async (userId: string): Promise<OrderInterface | OrderInterface[]> => {

    await connectToDatabase();

    const res = await orderModel.find({ userId: userId })
    return res

}

// Add Get all orders dal func
const getOrders = async (): Promise<OrderInterface | OrderInterface[]> => {

    await connectToDatabase();

    const res = await orderModel.find({})
    return res

}

// Update order dal func
const updateOrder = async (
    orderId: mongoose.Types.ObjectId,
    changeOrderBody: ChangeOrderBody
): Promise<OrderInterface | OrderInterface[] | null | ProductQuantity[] | undefined | string> => {

    await connectToDatabase();

    // Find this order
    const existingOrder = await orderModel.findById({ _id: orderId, new: true })

    //If INTERNAL_SERVER_RRROR
    if (!existingOrder) {
        throw new RequestError("Server error, please try again", STATUS_CODES.INTERNAL_SERVER_RRROR)
    }

    // If not find such an orderId"
    if (!Object.keys(existingOrder!).length) {
        throw new RequestError("We did not find such an orderId", STATUS_CODES.BAD_REQUEST)
    }

    const orderStatus = existingOrder.status

    // All status states that cannot be changed
    const immutableStatuses: string[] = ["Sent", "Received", "Canceled"]

    // Checking whether the status can be changed
    if (immutableStatuses.includes(orderStatus)) {
        throw new Error('This order cannot be edited, as it has been processed')
    }

    //If you want to cancel the order
    if (changeOrderBody.status === "Canceled") {
        const res = await serverCheckOrder.getAndSetQuantity(existingOrder, Action.return)
        if (res) return "The order has been successfully deleted"
    }

    // Checks if there is a value
    if (changeOrderBody.status) {
        existingOrder.status = changeOrderBody.status;
    }
    if (changeOrderBody.address!.celPhone) {
        existingOrder.shippingDetails.address.celPhone = changeOrderBody.address!.celPhone;
    }
    if (changeOrderBody.address) {
        existingOrder.shippingDetails.address = changeOrderBody.address;
    }

    const updatedOrder = await existingOrder.save();
    return updatedOrder;
}

const orderDal = { addOrder, getOrdersByUserId, getOrders, updateOrder, }
export default orderDal