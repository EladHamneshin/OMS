interface Address {
    country: string;
    city: string;
    street: string;
    celPhone: number;
    zipCode: number;
}

interface Product {
    productId: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export enum OrderStatusEnum {
    Waiting = 'Waiting',
    Sent = 'Sent',
    Received = 'Received',
    Canceled = 'Canceled'
}

export const OrderEnum = {
    Express: 'Express',
    Regular: 'Regular',
    SelfCollection: 'SelfCollection'
} as const;

export type OrderEnum = keyof typeof OrderEnum;

interface ShippingDetails {
    address: Address;
    contactNumber: string;
    orderType: OrderEnum;
}

interface OrderInterface {
    cartItems: Product[];
    userId: string;
    orderTime: Date;
    userName: string;
    userEmail: string;
    status: OrderStatusEnum;
    totalPrice: number;
    shippingDetails: ShippingDetails;
}

export interface ChangeStatusBody {
    status: OrderStatusEnum
}
export default OrderInterface;
