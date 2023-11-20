import OrderInterface from "../types/Order"
import orderDal from '../dal/orderDal'

const addOrder = async (order: OrderInterface): Promise<OrderInterface> => {

    const result = await orderDal.addOrder(order)

    if (!result) {
        throw new Error('Something went wrong while placing the order, please try again')
    }
    else {
        return result;
    }
}

const getOrders = async (userId: string): Promise<OrderInterface | OrderInterface[]> => {

    const result = await orderDal.getOrders(userId)

    if (!Object.keys(result).length) {
        throw new Error(`there is no such a user number: ${userId}`)
    }

    else {
        return result;
    }
}

const orderServices = { addOrder, getOrders }
export default orderServices