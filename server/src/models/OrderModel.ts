import mongoose from "mongoose";
import OrderInterface, { OrderEnum, OrderStatusEnum } from "../types/Order.js";

const orderSchema = new mongoose.Schema<OrderInterface>(
    {
        cartItems: [
            {
                productId: String,
                name: String,
                description: String,
                salePrice: Number,
                quantity: Number,
                discount: Number,
                image: {
                    url: String,
                },
            },
        ],
        userId: String,
        orderTime: Date,
        userName: String,
        userEmail: String,
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
                zipCode: Number,
            },
            contactNumber: String,
            orderType: {
                type: String,
                enum: Object.values(OrderEnum),
            },
        },
        contactNumber: String,
    },
    {
        strict: false,
    }
);

const orderModel = mongoose.model<OrderInterface>('orders', orderSchema);

export default orderModel;