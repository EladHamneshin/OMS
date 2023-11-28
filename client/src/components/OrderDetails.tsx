import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import OrderInterface, { OrderStatusEnum, OrderEnum } from '../types/orderType';  // Import the enum
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/base';
import { useState, useEffect } from 'react';
import {updateOrder} from '../api/ordersApi'

interface OrderDetailsProps {
    selectedOrder: OrderInterface;
    onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ selectedOrder }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedOrder, setEditedOrder] = useState(selectedOrder);

    useEffect(() => {
        if (isEditMode) {
            setEditedOrder(selectedOrder);
        }
    }, [isEditMode, selectedOrder]);

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleSave = async () => {
        try {
            // Save the edited values
            setIsEditMode(false);
            const updatedOrder = await updateOrder(selectedOrder._id!, {status: editedOrder.status,});
                        console.log('Order updated successfully:', updatedOrder);
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };
    

    const admin = localStorage.getItem('admin')
    const adminTrue = localStorage.getItem('admin') === 'true';
    const orderType = selectedOrder.shippingDetails.orderType === "SelfCollection" 

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);

        // Assuming OrderStatusEnum is an enum, parse the input value to the enum type
        setEditedOrder({ ...editedOrder, status: e.target.value as OrderStatusEnum });
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedOrder({
            ...editedOrder,
            shippingDetails: {
                ...editedOrder.shippingDetails,
                address: { ...editedOrder.shippingDetails?.address, street: e.target.value, city: e.target.value },
            },
        });
    };

    return (
        <>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="text.secondary">
                    Order Time: {selectedOrder ? new Date(selectedOrder.orderTime).toLocaleString() : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    status: {isEditMode && (adminTrue || admin) ? (
                        <select value={editedOrder.status} onChange={handleStatusChange as unknown as React.ChangeEventHandler<HTMLSelectElement>}>
                            <option value={OrderStatusEnum.Waiting}>Waiting</option>
                            {/* <option value={OrderStatusEnum.Sent}>Sent</option> */}
                            {orderType && <option value={OrderStatusEnum.Received}>Received</option>}
                            {adminTrue && <option value={OrderStatusEnum.Canceled}>Cancel</option>}
                        </select>
                    ) : (
                        selectedOrder?.status
                    )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Total Price: {selectedOrder?.totalPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Shipping Address: {isEditMode && admin ? (
                    <input
                        type="text"
                        value={[editedOrder.shippingDetails?.address?.street, editedOrder.shippingDetails?.address?.city, editedOrder.shippingDetails?.address?.country]}
                        onChange={handleAddressChange}
                    />
                ) : (
                    `${selectedOrder?.shippingDetails?.address?.street}, ${selectedOrder?.shippingDetails?.address?.city}, ${selectedOrder?.shippingDetails?.address?.country}`
                )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Contact Number: {selectedOrder?.shippingDetails?.contactNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Order Type: {selectedOrder?.shippingDetails?.orderType}
            </Typography>
            {isEditMode && (
                <Button onClick={handleSave}>
                    Save
                </Button>
            )}
            <Button onClick={handleEdit}>
                <EditIcon />
            </Button>
            <hr />
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
        </DialogContent >
        </>
    );
};

export default OrderDetails;
