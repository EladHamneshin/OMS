import mongoose from 'mongoose';
import OrderInterface, { OrderEnum, OrderStatusEnum } from '../types/Order';

const orderSchema: mongoose.Schema<OrderInterface> = new mongoose.Schema<OrderInterface>({

    // _id: mongoose.Types.ObjectId,
    cartItems: [{
        productId: String,
        name: String,
        description: String,
        price: Number,
        quantity: Number
    }],
    orderTime: Date,
    status: {
        type: String,
        enum: Object.values(OrderStatusEnum),
    },
    total: Number,
    shippingDetails: {
        address: {
            country: String,
            city: String,
            street: String,
            celPhone: Number,
            zipCode: Number
        },
        userId: String,
        contactNumber: String,
        orderType: {
            type: String,
            enum: Object.values(OrderEnum),
        }
    }
}
    , {
        strict: false
    }
);

const orderModel: mongoose.Model<OrderInterface> = mongoose.model<OrderInterface>('Orders', orderSchema);

export default orderModel