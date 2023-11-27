import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import OrderInterface from '../types/orderType';

interface OrderDetailsProps {
    selectedOrder: OrderInterface;
    onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ selectedOrder }) => (
    <>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
            <Typography variant="h5" component="div">
                Order by {selectedOrder.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Order Time: {selectedOrder ? new Date(selectedOrder.orderTime).toLocaleString() : ''}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Status: {selectedOrder?.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Total Price: {selectedOrder?.totalPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Shipping Address: {selectedOrder?.shippingDetails?.address?.street},{" "}
                {selectedOrder?.shippingDetails?.address?.city},{" "}
                {selectedOrder?.shippingDetails?.address?.country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Contact Number: {selectedOrder?.shippingDetails?.contactNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Order Type: {selectedOrder?.shippingDetails?.orderType}
            </Typography>
            <Typography variant="h6">Cart Items:</Typography>
            {selectedOrder?.cartItems?.map((item, index) => (
                <div key={index}>
                    <Typography variant="body2" color="text.secondary">
                        Product ID: {item.productId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Name: {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Description: {item.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {item.salePrice}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                    </Typography>
                    <hr />
                </div>
            ))}
        </DialogContent>
    </>
);

export default OrderDetails;
