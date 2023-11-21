import orderModel from "../Schemas/OrderModel";
import OrderInterface from "../types/Order"

const addOrder = async (order: OrderInterface): Promise<OrderInterface> => {

    const { cartItems, orderTime, userId, status, totalPrice, shippingDetails } = order;
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

const getOrders = async (userId: string): Promise<OrderInterface | OrderInterface[]> => {
    const res = await orderModel.find({ 'shippingDetails.userId': userId })
    return res

}

const orderDal = { addOrder, getOrders }
export default orderDal