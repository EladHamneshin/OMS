import mongoose from "mongoose";
import orderModel from "../Schemas/OrderModel.js";
import OrderInterface, { ChangeOrderBody } from "../types/Order.js"
import connectToDatabase from "../configs/connectToMongogoDB.js";
import serverCheckOrder from "../services/checkOrder.js";
import ProductsQuantities, { Action, ProductQuantity } from "../types/ProductsQuantities.js";

const addOrder = async (order: OrderInterface): Promise<OrderInterface> => {

    await connectToDatabase();

    const { cartItems, userId, userName, userEmail, celPhone, orderTime, status, totalPrice, shippingDetails } = order;
    const { address, contactNumber, orderType } = shippingDetails;
    const { city, country, zipCode, street } = address

    const res = await orderModel.create({
        cartItems: cartItems,
        orderTime: orderTime,
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        celPhone: celPhone,
        status: status,
        totalPrice: totalPrice,
        shippingDetails: {
            address: {
                city: city,
                country: country,
                zipCode: zipCode,

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

    const res = await orderModel.find({ userId: userId })
    return res

}

const getOrders = async (): Promise<OrderInterface | OrderInterface[]> => {

    await connectToDatabase();

    const res = await orderModel.find({})
    return res

}

const updateOrders = async (
    orderId: mongoose.Types.ObjectId,
    changeOrderBody: ChangeOrderBody
): Promise<OrderInterface | OrderInterface[] | null | ProductQuantity[] | undefined> => {

    await connectToDatabase();

    const immutableStatuses: string[] = ["Sent", "Received", "Canceled"]

    const existingOrder = await orderModel.findById({ _id: orderId, new: true })
    if (!existingOrder) {
        return null;
    }

    const orderStatus = existingOrder.status

    if (immutableStatuses.includes(orderStatus)) {
        throw new Error('This order cannot be edited, as it has been processed')
    }

    if (changeOrderBody.status === "Canceled") {

        const productQuantityArray = serverCheckOrder.creatProductsQuantitiesArray(existingOrder!.cartItems)
        const productsQuantitiesInterface: ProductsQuantities = {
            productsArray: productQuantityArray,
            action: Action.return
        }
        const res = await serverCheckOrder.getAndSetQuantity(productsQuantitiesInterface)
        return res

    }
    if (changeOrderBody.status) {
        existingOrder.status = changeOrderBody.status;
    }
    if (changeOrderBody.celPhone) {
        existingOrder.celPhone = changeOrderBody.celPhone;
    }
    if (changeOrderBody.address) {
        existingOrder.shippingDetails.address = changeOrderBody.address;
    }

    const updatedOrder = await existingOrder.save();
    return updatedOrder;
}

const orderDal = { addOrder, getOrdersByUserId, getOrders, updateOrders }
export default orderDal