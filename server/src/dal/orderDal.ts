import mongoose from "mongoose";
import orderModel from "../models/OrderModel.js";
import OrderInterface, {  OrderEnum, OrderStatusEnum } from "../types/Order.js"
// import ProductsQuantities, { Action } from "../types/ProductsQuantities.js";

const addOrder = async (order: OrderInterface) => {
    const res = await orderModel.create(order);

    console.log(res.shippingDetails.orderType !== OrderEnum.SelfCollection);

    if (res.shippingDetails.orderType !== OrderEnum.SelfCollection) {
        setTimeout(async () => {
            const updatedOrder = await orderModel.findByIdAndUpdate(
                res._id,
                { $set: { status: OrderStatusEnum.Sent } },
            );
        }, 10000);
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
        return 15000;
    }
    return 20000;

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

// const updateOrderStatus = async (orderId: string, newStatus: OrderStatusEnum): Promise<OrderInterface | null> => {
//     try {
//         const updatedOrder = await orderModel.findByIdAndUpdate(
//             orderId,
//             { $set: { status: newStatus } },
//             { new: true }
//         );

//         return updatedOrder;
//     } catch (error) {
//         console.error(`Error updating order status: ${error}`);
//         return null;
//     }
// };

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

export default { addOrder, getOrdersByUserId, getOrders, updateOrder}
