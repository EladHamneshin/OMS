
import OrderInterface from "../types/Order.js"
import orderDal from '../dal/orderDal.js'
import serverCheckOrder from "./serverCheckOrder.js"
import ProductsQuantities, { Action } from "../types/ProductsQuantities.js"


const addOrder = async (order: OrderInterface): Promise<OrderInterface | undefined> => {
   // old version ######
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
    // ######

    const productsQuantitiesArray = serverCheckOrder.creatProductsQuantitiesArray(order.cartItems)
    const productsQuantities: ProductsQuantities = {
        productsArray: productsQuantitiesArray,
        action: Action.buy
    }
    await serverCheckOrder.getAndSetQuantity(productsQuantities)
    const result = await orderDal.addOrder(order)
    if (!result) {
        throw new Error('Something went wrong while placing the order, please try again')
    }
    else {

        return result;
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

const orderServices = { addOrder, getOrdersByUserId, getOrders }
export default orderServices