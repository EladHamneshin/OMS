import OrderInterface, { ChangeStatusBody, OrderEnum, OrderStatusEnum } from "../types/Order.js"
import orderDal from '../dal/orderDal.js'
// import serverCheckOrder from "./serverCheckOrder.js"
// import ProductsQuantities from "../types/ProductsQuantities.js"
import mongoose from "mongoose"
import isEnumValue from "./isEnumValue.js"


const addOrder = async (order: OrderInterface): Promise<OrderInterface | undefined> => {

   

    if (!isEnumValue(order.status, OrderStatusEnum)) {
        const validStatusValues = Object.values(OrderStatusEnum).join(', ');
        throw new Error(
            `The value in the field 'status' can only receive one of the following strings: ${validStatusValues}, not: ${order.status}`
        );
    }
    if (!isEnumValue(order.shippingDetails.orderType, OrderEnum)) {
        const validOrderTypeValues = Object.values(OrderEnum).join(', ');
        throw new Error(
            `The value in the field 'order.shippingDetails.orderType' can only receive one of the following strings: ${validOrderTypeValues}, not: ${order.shippingDetails.orderType}`
        );
    }
    const productsQuantities= {
        productsArray: order.cartItems ,
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
            throw new Error('Something went wrong while placing the order, please try again')
        }
        else {
            return result;
        }
    }
}



const getOrdersByUserId = async (userId: string): Promise<OrderInterface[]> => {
    try {
        const result = await orderDal.getOrdersByUserId(userId);

        if (!result) {
            throw new Error(`There are no orders for user number: ${userId}`);
        }
        return result;
    } catch (error) {
        throw new Error(`Error while fetching orders: ${error}`);
    }
};


const getOrders = async () => {

    const result = await orderDal.getOrders()

    if (!Object.keys(result).length) {
        throw new Error("Something went wrong with the request, please try again")
    }
    else {
        return result;
    }
}

const updateOrders = async (
    orderId: mongoose.Types.ObjectId,
    newStatus: ChangeStatusBody
): Promise<OrderInterface | OrderInterface[] | null> => {

    const result = await orderDal.updateOrders(orderId, newStatus)

    if (!Object.keys(result!).length) {
        throw new Error("Something went wrong with the request, please try again")
    }
    else {
        return result;
    }
}

export default { addOrder, getOrdersByUserId, getOrders, updateOrders }
