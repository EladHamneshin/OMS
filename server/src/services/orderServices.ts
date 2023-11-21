
import OrderInterface from "../types/Order"
import orderDal from '../dal/orderDal'
import getAndSetQuantity from "./updateOrder"
import ProductsQuantities from "../types/productsQuantities"




const addOrder = async (order: OrderInterface): Promise<OrderInterface> => {

    if (!getAndSetQuantity) {
        throw new Error('there are products out of stock in this order, please try again')
    } else {
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

const orderServices = { addOrder, getOrdersByUserId, getOrders }
export default orderServices