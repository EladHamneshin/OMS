import mongoose from "mongoose";
import ProductInterface from "./Product";

interface OrderInterface {
    cartItems: ProductInterface[]
    orderTime: Date;
    status: OrderStatusEnum;
    total: number;
    shippingDetails: {
        address: {
            country: string,
            city: string,
            street: string,
            celPhone: number,
            zipCode: number
        };
        userId: string
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
export default OrderInterface