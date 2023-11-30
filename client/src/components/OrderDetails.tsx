import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/base';
import { useState, useEffect } from 'react';
import { updateOrder } from '../api/ordersApi';
import OrderInterface, { OrderStatusEnum } from '../types/orderType';


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
      setIsEditMode(false);
  
      if (!selectedOrder._id) {
        throw new Error('No order ID');
      }
      const {  status, shippingDetails } = editedOrder;
  
      const updatedOrder = await updateOrder(editedOrder._id!, { status, shippingDetails });
      // Update the selectedOrder state to reflect the changes
      setEditedOrder(updatedOrder);
      
      console.log('Order updated successfully:', updatedOrder);
      // window.location.reload()
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedOrder({
      ...editedOrder,
      status: e.target.value as OrderStatusEnum,
    });
  };

  const handleAddressChange = (field: string, value: string) => {
    setEditedOrder({
      ...editedOrder,
      shippingDetails: {
        ...editedOrder.shippingDetails,
        address: {
          ...editedOrder.shippingDetails?.address,
          
          [field]: field === 'zipCode' ? parseInt(value) : value,
        },
      },
    });
  };
  const admin = localStorage.getItem('admin')
  const adminTrue = localStorage.getItem('admin') === 'true';
  const orderType = selectedOrder.shippingDetails.orderType === "SelfCollection"
  const modeShipping = selectedOrder.status === "Waiting"
  return (
    <>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent style={{ minWidth: '500px', maxWidth: '800px', overflowY: 'auto', maxHeight: '50vh' }}>
        <Typography variant="body2" color="text.secondary">
          Order Time: {selectedOrder ? new Date(selectedOrder.orderTime).toLocaleString() : ''}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          status: {isEditMode && modeShipping && (adminTrue || admin) ? (
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
          Shipping Address:{' '}
          {isEditMode && (
            <>
              <input
                type="text"
                value={editedOrder.shippingDetails?.address?.country || ''}
                placeholder="Country"
                onChange={(e) => handleAddressChange('country', e.target.value)}
              />
              <input
                type="text"
                value={editedOrder.shippingDetails?.address?.city || ''}
                placeholder="City"
                onChange={(e) => handleAddressChange('city', e.target.value)}
              />
              <input
                type="text"
                value={editedOrder.shippingDetails?.address?.street || ''}
                placeholder="Street"
                onChange={(e) => handleAddressChange('street', e.target.value)}
              />
              <input
                type="number"
                value={editedOrder.shippingDetails?.address?.zipCode || ''}
                placeholder="Zipcode"
                onChange={(e) => handleAddressChange('zipCode', e.target.value)}
              />
            </>
          )}
          {!isEditMode && modeShipping &&(
            <>
              {selectedOrder?.shippingDetails?.address?.country}, {selectedOrder?.shippingDetails?.address?.city}, {selectedOrder?.shippingDetails?.address?.street}, {selectedOrder?.shippingDetails?.address?.zipCode}
            </>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact Number: {selectedOrder?.contactNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Order Type: {selectedOrder?.shippingDetails?.orderType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          User Name: {selectedOrder?.userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          User Email: {selectedOrder?.userEmail}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cart Items:
        </Typography>
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
            <Typography variant="body2" color="text.secondary">
              Discount: {item.discount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Image URL: {item.image.url}
            </Typography>
            <hr />
          </div>
        ))}
        {isEditMode && (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsEditMode(false)}>Cancel</Button>
          </>
        )}
        {!isEditMode && (
          <Button onClick={handleEdit}>
            <EditIcon />
          </Button>
        )}
      </DialogContent>
    </>
  );
};

export default OrderDetails;
