
import OrderInterface, { ChangeOrderBody, OrderEnum, OrderStatusEnum } from "../types/Order.js"
import orderDal from '../dal/orderDal.js'
import serverCheckOrder from "./checkOrder.js"
import ProductsQuantities, { Action, ProductQuantity } from "../types/ProductsQuantities.js"
import mongoose from "mongoose"
import isEnumValue from "./isEnumValue.js"
import RequestError from "../utils/RequestError.js"
import STATUS_CODES from "../utils/StatusCodes.js"

// Add order services func 
const addOrder = async (order: OrderInterface): Promise<OrderInterface | undefined | Error> => {

    // Check if "order.status" not in "OrderStatusEnum"
    if (!isEnumValue(order.status, OrderStatusEnum)) {
        throw new RequestError(`The value in the field: status can only receive one of the following strings: 'Waiting' | 'Sent' | 'Received' | 'Canceled', not: ${order.status}`,
            STATUS_CODES.BAD_REQUEST)
    }
    // Check if "order.shippingDetails.orderType" not in "OrderEnum"
    if (!isEnumValue(order.shippingDetails.orderType, OrderEnum)) {
        throw new RequestError(`The value in the field: order.shippingDetails.orderType can only receive one of the following strings: 'Express' | 'Regular' | 'SelfCollection', not: ${order.shippingDetails.orderType}`,
            STATUS_CODES.BAD_REQUEST)
    }

    // Fetch to 'ERP' to check quantities
    await serverCheckOrder.getAndSetQuantity(order, Action.buy)

    const result = await orderDal.addOrder(order)

    if (!result) {
        throw new RequestError('Something went wrong while placing the order, please try again', STATUS_CODES.INTERNAL_SERVER_RRROR)
    }
    else {
        return result;
    }
}

// Get all orders by userId Services func
const getOrdersByUserId = async (userId: string): Promise<OrderInterface | OrderInterface[]> => {

    const result = await orderDal.getOrdersByUserId(userId)

    if (!Object.keys(result).length) {
        throw new RequestError(`there is no such a user number: ${userId}`, STATUS_CODES.BAD_REQUEST)
    }
    else {
        return result;
    }
}

// Get all orders Services func
const getOrders = async (): Promise<OrderInterface | OrderInterface[]> => {

    const result = await orderDal.getOrders()

    if (!Object.keys(result).length) {
        throw new RequestError("Something went wrong with the request, please try again", STATUS_CODES.INTERNAL_SERVER_RRROR)
    }
    else {
        return result;
    }
}

// Update order Services func
const updateOrder = async (
    orderId: mongoose.Types.ObjectId,
    changeOrderBody: ChangeOrderBody
): Promise<OrderInterface | OrderInterface[] | null | ProductQuantity[] | undefined | string> => {

    const result = await orderDal.updateOrder(orderId, changeOrderBody)

    if (!Object.keys(result!).length) {
        throw new RequestError("Something went wrong with the request, please try again", STATUS_CODES.INTERNAL_SERVER_RRROR)
    }
    else {
        return result;
    }
}

const orderServices = { addOrder, getOrdersByUserId, getOrders, updateOrder }
export default orderServices