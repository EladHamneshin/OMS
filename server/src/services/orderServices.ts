
import OrderInterface, { ChangeStatusBody, OrderEnum, OrderStatusEnum } from "../types/Order.js"
import orderDal from '../dal/orderDal.js'
import serverCheckOrder from "./serverCheckOrder.js"
import ProductsQuantities from "../types/ProductsQuantities.js"
import mongoose from "mongoose"
import isEnumValue from "./isEnumValue.js"


const addOrder = async (order: OrderInterface): Promise<OrderInterface | undefined> => {

    //  ##### אם יפתחו את האפשרות לבדוק כל מוצר בנפרד להדליק מפה ######
    // const { cartItems } = order

    // const newCartItems = await serverForEachProduct.updateCart(cartItems)

    // const newOrder: OrderInterface = {
    //     cartItems: newCartItems,
    //     shippingDetails: order.shippingDetails,
    //     orderTime: order.orderTime,
    //     status: order.status,
    //     total: order.total
    // }

    // const result = await orderDal.addOrder(newOrder)
    // ###### עד פה ######


    if (!isEnumValue(order.status, OrderStatusEnum)) {
        throw new Error(`The value in the field: status can only receive one of the following strings: 'Waiting' | 'Sent' | 'Received' | 'Canceled', not: ${order.status}`)
    }
    if (!isEnumValue(order.shippingDetails.orderType, OrderEnum)) {
        throw new Error(`The value in the field: order.shippingDetails.orderType can only receive one of the following strings: 'Express' | 'Regular' | 'SelfCollection', not: ${order.shippingDetails.orderType}`)
    }

    const productsQuantitiesArray = serverCheckOrder.creatProductsQuantitiesArray(order.cartItems)

    const response = await serverCheckOrder.getAndSetQuantity(productsQuantitiesArray)
    if (response) {
        const result = await orderDal.addOrder(order)
        if (!result) {
            throw new Error('Something went wrong while placing the order, please try again')
        }
        else {
            return result;
        }
    }
}


const getOrdersByUserId = async (userId: string): Promise<OrderInterface | OrderInterface[]> => {

    const result = await orderDal.getOrdersByUserId(userId)

    if (!Object.keys(result).length) {
        throw new Error(`there is no such a user number: ${userId}`)
    }
    else {
        return result;
    }
}

const getOrders = async (): Promise<OrderInterface | OrderInterface[]> => {

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

const orderServices = { addOrder, getOrdersByUserId, getOrders, updateOrders }
export default orderServices