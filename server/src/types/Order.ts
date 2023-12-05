interface Address {
    country: string;
    city: string;
    street: string;
    zipCode: number;
}

interface Product {
    productId: string;
    name: string;
    description: string;
    salePrice: number;
    quantity: number;
    discount: number;
    image: {
        url: string
    };
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
};

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


export default OrderInterface;
