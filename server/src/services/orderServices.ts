import OrderInterface from "../types/Order"
import orderDal from '../dal/orderDal'

const addOrder = async (order: OrderInterface) => {

    const result = await orderDal.addOrder(order)

    if (!result) {
        throw new Error('Something went wrong while placing the order, please try again')
    }
    else {
        return result;
    }
}

const orderServices = { addOrder }
export default orderServices