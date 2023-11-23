import mongoose from "mongoose";
import Product from "./Product.js";

interface OrderInterface {
    cartItems: Product[];
    userId: string;
    userName: string;
    userEmail: string;
    orderTime: Date;
    status: OrderStatusEnum;
    totalPrice: number;
    shippingDetails: {
        address: {
            country: string,
            city: string,
            celPhone: number,
            street: string,
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

export interface ChangeOrderBody {
    status?: OrderStatusEnum,
    address?: {
        country: string,
        celPhone: number,
        city: string,
        street: string,
        zipCode: number
    };
}

export default OrderInterface