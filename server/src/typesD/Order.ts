interface OrderInterface {
    cartItems: ProductInterface[];
    orderTime: Date;
    status: string;
    Price: number;
    shippingDetails: {
        address: string;
        userId: number
        contactNumber: string;
        orderType: string
    }
}