import mongoose from "mongoose";
import Product from "./Product.js";

interface OrderInterface {
    cartItems: Product[];
    userId: string;
    userName: string;
    userEmail: string;
    orderTime: Date;
    userName: String,
    userEmail: String,
    status: OrderStatusEnum;
    totalPrice: number;
    shippingDetails: {
        address: {
            country: string,
            city: string,
            street: string,
            celPhone: number,
            zipCode: number
        };
        contactNumber: string;
        orderType: OrderEnum
    }
}

export enum OrderEnum {
    Express = 'Express',
    Regular = 'Regular',
    SelfCollection = 'SelfCollection'
}

export enum OrderStatusEnum {
    Waiting = 'Waiting',
    Sent = 'Sent',
    Received = 'Received',
    Canceled = 'Canceled'
}

export interface ChangeStatusBody {
    status: OrderStatusEnum
}

export default OrderInterface