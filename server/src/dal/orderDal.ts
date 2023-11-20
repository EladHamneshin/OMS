import orderModel from "../Schemas/OrderModel";
import OrderInterface from "../types/Order"

const addOrder = async (order: OrderInterface) => {

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

const orderDal = { addOrder }
export default orderDal