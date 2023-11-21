import mongoose from 'mongoose';
import OrderInterface, { OrderEnum, OrderStatusEnum } from '../types/Order';
import Product from '../types/Product';
import Order from '../types/Order';

const orderSchema = new mongoose.Schema<Order>({
    cartItems: [
        {
            id: String,
            name: String,
            description: String,
            price: Number,
            quantity: Number,
        },
    ],


    orderTime: Date,
    userId: String,
    status: {
        type: String,
        enum: Object.values(OrderStatusEnum),
    },
    totalPrice: Number,
    shippingDetails: {
        address: {
            country: String,
            city: String,
            street: String,
            celPhone: Number,
            zipCode: Number,
        },
        contactNumber: String,
        orderType: {
            type: String,
            enum: Object.values(OrderEnum),
        },
    }
}
    , {
        strict: false
    }
);

const orderModel: mongoose.Model<OrderInterface> = mongoose.model<OrderInterface>('orders', orderSchema);

export default orderModel