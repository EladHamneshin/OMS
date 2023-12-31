import OrderInterface, { OrderEnum, OrderStatusEnum } from "../types/Order.js"
import orderDal from '../dal/orderDal.js'
// import serverCheckOrder from "./serverCheckOrder.js"
// import ProductsQuantities from "../types/ProductsQuantities.js"
import mongoose from "mongoose"
import isEnumValue from "./isEnumValue.js"
import RequestError from "../utils/RequestError.js"
import STATUS_CODES from "../utils/StatusCodes.js"


const addOrder = async (order: OrderInterface) => {

    if (!isEnumValue(order.status, OrderStatusEnum)) {
        const validStatusValues = Object.values(OrderStatusEnum).join(', ');
        throw new RequestError(`The value in the field: status can only receive one of the following strings: 'Waiting' | 'Sent' | 'Received' | 'Canceled', not: ${validStatusValues}`,
            STATUS_CODES.BAD_REQUEST);
    }
    if (!isEnumValue(order.shippingDetails.orderType, OrderEnum)) {
        const validOrderTypeValues = Object.values(OrderEnum).join(', ');
        throw new RequestError(`The value in the field: order.shippingDetails.orderType can only receive one of the following strings: 'Express' | 'Regular' | 'SelfCollection', not: ${validOrderTypeValues}`,
            STATUS_CODES.BAD_REQUEST);
    }
    const productsQuantities = {
        productsArray: order.cartItems,
        action: "buy"
    }
    // await serverCheckOrder.getAndSetQuantity(productsQuantities)
    const result = await orderDal.addOrder(order)
    if (!result) {
        throw new Error('Something went wrong while placing the order, please try again')
    }
    else {
        // const productsQuantitiesArray = serverCheckOrder.creatProductsQuantitiesArray(order.cartItems)

        // const response = await serverCheckOrder.getAndSetQuantity(productsQuantitiesArray)
        // if (response) {
        //     const result = await orderDal.addOrder(order)
        if (!result) {
            throw new RequestError('Something went wrong while placing the order, please try again', STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
        else {
            return result;
        }
    }
}



const getOrdersByUserId = async (userId: string): Promise<OrderInterface[]> => {

    const result = await orderDal.getOrdersByUserId(userId);

    if (!result) {
        throw new RequestError(`there is no such a user number: ${userId}`, STATUS_CODES.BAD_REQUEST)
    }
    return result;

};


const getOrders = async () => {

    const result = await orderDal.getOrders()

    if (!Object.keys(result).length) {
        throw new RequestError("Something went wrong with the request, please try again", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    else {
        return result;
    }
}

const validateOrderUpdate = (isAdmin: boolean, updatedFields: Partial<OrderInterface>): void => {
    const allowedFields= ['status', 'shippingDetails'];
    if (!isAdmin && updatedFields.status === 'Canceled') {
        throw new Error('Invalid update for non-admin user');
    }
    for (const field in updatedFields) {
        if (!allowedFields.includes(field)) {
            throw new Error(`Field '${field}' is not allowed for admin update`);
        }
        if (field === 'shippingDetails' && updatedFields[field]) {
            const subFields = Object.keys((updatedFields[field]!).address);
            const allowedSubFields = ['country', 'city', 'street', 'zipCode'];

            for (const subField of subFields) {
                if (!allowedSubFields.includes(subField)) {
                    throw new Error(`Field 'shippingDetails.${subField}' is not allowed for admin update`);
                }
            }
        }
    }
};


const updateOrder = async (orderId: string, isAdmin: boolean, updatedFields: Partial<OrderInterface>) => {
    validateOrderUpdate(isAdmin, updatedFields);
    const updatedOrder = await orderDal.updateOrder(orderId, updatedFields);
    if (updatedOrder) {
        return updatedOrder
    }
    throw new RequestError(`Field  to update`, STATUS_CODES.NO_CONTENT);
}

export default { addOrder, getOrdersByUserId, getOrders, updateOrder }
