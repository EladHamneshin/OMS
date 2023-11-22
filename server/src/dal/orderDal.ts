import orderModel from "../Schemas/OrderModel.js";
import OrderInterface from "../types/Order.js"

const addOrder = async (order: OrderInterface): Promise<OrderInterface> => {
    const { cartItems, userId, orderTime, status, totalPrice, shippingDetails } = order;
    const { address, contactNumber, orderType } = shippingDetails;
    const { city, country, zipCode, celPhone, street } = address

    const res = await orderModel.create({
        cartItems: cartItems,
        orderTime: orderTime,
        userId: userId,
        status: status,
        totalPrice: totalPrice,
        shippingDetails: {
            address: {
                city: city,
                country: country,
                zipCode: zipCode,
                celPhone: celPhone,
                street: street
            },
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