import mongoose from "mongoose";
import orderModel from "../Schemas/OrderModel.js";
import OrderInterface, { ChangeOrderBody, ChangeStatusBody } from "../types/Order.js"
import ProductsQuantities, { Action } from "../types/ProductsQuantities.js";

const addOrder = async (order: OrderInterface) => {
    const res = await orderModel.create({order});
    return res
}

const getOrdersByUserId = async (userId: string): Promise<OrderInterface[]>  => {
    const res = await orderModel.find({ 'order.userId': userId })
    return res
}

const getOrders = async () => {
    const res = await orderModel.find({})
    return res
}

// const updateOrders = async (
//     orderId: mongoose.Types.ObjectId,
//     changeOrderBody: ChangeOrderBody
// ): Promise<OrderInterface | OrderInterface[] | null | ProductQuantity[] | undefined> => {


//     const immutableStatuses: string[] = ["Sent", "Received", "Canceled"]

//     const existingOrder = await orderModel.findById({ _id: orderId, new: true })
//     if (!existingOrder) {
//         return null;
//     }

//     const orderStatus = existingOrder.status

//     if (immutableStatuses.includes(orderStatus)) {
//         throw new Error('This order cannot be edited, as it has been processed')
//     }

//     if (changeOrderBody.status === "Canceled") {

//         const productsQuantitiesInterface: ProductsQuantities = {
//             productsArray: productQuantityArray,
//             action: Action.return
//         }
//         const res = await serverCheckOrder.getAndSetQuantity(productsQuantitiesInterface)
//         return res

//     }
//     if (changeOrderBody.status) {
//         existingOrder.status = changeOrderBody.status;
//     }
//     if (changeOrderBody.celPhone) {
//         existingOrder.cartItems = changeOrderBody.celPhone;
//     }
//     if (changeOrderBody.address) {
//         existingOrder.shippingDetails.address = changeOrderBody.address;
//     }

//     const updatedOrder = await existingOrder.save();
//     return updatedOrder;
// }

export default { addOrder, getOrdersByUserId, getOrders }
