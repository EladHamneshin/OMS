import orderModel from "../Schemas/OrderModel";
import OrderInterface from "../types/Order"

const addOrder = async (order: OrderInterface): Promise<OrderInterface> => {

    const { cartItems, orderTime, status, total, shippingDetails } = order; cartItems
    const { address, userId, contactNumber, orderType } = shippingDetails;
    const { city, country, zipCode, celPhone, street } = address

    const res = await orderModel.create({
        cartItems: cartItems,
        orderTime: orderTime,
        status: status,
        total: total,
        shippingDetails: {
            address: {
                city: city,
                country: country,
                zipCode: zipCode,
                celPhone: celPhone,
                street: street
            },
            userId: userId,
            contactNumber: contactNumber,
            orderType: orderType,
        },
    });

    return res
}

const getOrdersByUserId = async (userId: string): Promise<OrderInterface | OrderInterface[]> => {
    const res = await orderModel.find({ 'shippingDetails.userId': userId })
    return res

}

const getOrders = async (): Promise<OrderInterface | OrderInterface[]> => {
    const res = await orderModel.find({})
    return res
}

const orderDal = { addOrder, getOrdersByUserId, getOrders }
export default orderDal