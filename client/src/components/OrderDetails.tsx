import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { Input, Select, MenuItem, Box, SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../theme/theme';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { updateOrder } from '../api/ordersApi';
import OrderInterface, { OrderStatusEnum } from '../types/orderType';
import { countries } from "../data/country"
import DetailsBox from './DetailsBox';

interface OrderDetailsProps {
  selectedOrder: OrderInterface;
  Refresh: () => void;
  close: () => void;
}

// interface DetailsBoxProps {
//   title: string;
//   description: React.ReactNode;
//   isCartItems?: boolean;
// }

const OrderDetails: React.FC<OrderDetailsProps> = ({ selectedOrder, Refresh, close }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedOrder, setEditedOrder] = useState<OrderInterface>(selectedOrder);
  const [selectCountries, setSelectCountries] = useState<string>('');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (isEditMode) {
      setEditedOrder(selectedOrder);
      setSelectCountries(selectedOrder?.shippingDetails?.address?.country || '')
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
      const { status, shippingDetails } = editedOrder;
      const updatedOrder = await updateOrder(editedOrder._id!, { status, shippingDetails });
      setEditedOrder(updatedOrder);
      console.log('Order updated successfully:', updatedOrder);
      Refresh();
      close();
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<{ value: OrderStatusEnum }>) => {
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

  const handleChangeCountries = (e: SelectChangeEvent<string>) => {
    const selectedCountry = e.target.value as string;
    setSelectCountries(selectedCountry)

    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      shippingDetails: {
        ...prevOrder.shippingDetails,
        address: {
          ...prevOrder.shippingDetails?.address,
          country: selectedCountry,
        },
      },
    }));
  };

  const admin = localStorage.getItem('admin');
  const storedAdmin = JSON.parse(localStorage.getItem('admin')!);
  const adminTrue = storedAdmin && storedAdmin.is_admin === true;
  const orderType = selectedOrder.shippingDetails.orderType === 'SelfCollection';
  const modeShipping = selectedOrder.status === 'Waiting';

  return (
    <Box sx={{ m: "20px", minHeight: '100%' }}>
      <Typography variant="h4" color={colors.lightBlue[700]}>
        Order Details
      </Typography>
      <DialogContent style={{ overflowY: 'auto', maxHeight: '500vh' }}>
        <DetailsBox title='Order Time' description={selectedOrder ? new Date(selectedOrder.orderTime).toLocaleString() : ''}></DetailsBox>
        <DetailsBox title='Status' description={isEditMode && modeShipping && (adminTrue || admin) ? (
          <select
            value={editedOrder.status}
            onChange={(e) => handleStatusChange(e as React.ChangeEvent<{ value: OrderStatusEnum }>)}>
            <option value={OrderStatusEnum.Waiting}>Waiting</option>
            {orderType && <option value={OrderStatusEnum.Received}>Received</option>}
            {adminTrue && <option value={OrderStatusEnum.Canceled}>Cancel</option>}
          </select>
        ) : (
          selectedOrder?.status
        )}></DetailsBox>
        <DetailsBox title='Total Price' description={selectedOrder?.totalPrice}></DetailsBox>
        <DetailsBox title='Shipping Address' description={isEditMode && modeShipping ? (
          <>
            <Select
              value={isEditMode ? selectCountries : editedOrder.shippingDetails?.address?.country}
              placeholder="Country"
              onChange={handleChangeCountries}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
            <Input
              sx={{ marginLeft: "10px", marginRight: "10px" }}
              type="text"
              value={editedOrder.shippingDetails?.address?.city || ''}
              placeholder="City"
              onChange={(e) => handleAddressChange('city', e.target.value)}
            />
            <Input
              sx={{ marginLeft: "10px", marginRight: "10px" }}
              type="text"
              value={editedOrder.shippingDetails?.address?.street || ''}
              placeholder="Street"
              onChange={(e) => handleAddressChange('street', e.target.value)}
            />
            <Input
              sx={{ marginLeft: "10px", marginRight: "10px" }}
              type="number"
              value={editedOrder.shippingDetails?.address?.zipCode || ''}
              placeholder="Zipcode"
              onChange={(e) => handleAddressChange('zipCode', e.target.value)}
            />
          </>
        ) : (
          <>
            <DetailsBox title='Country' description={selectedOrder?.shippingDetails?.address?.country}></DetailsBox>
            <DetailsBox title='City' description={selectedOrder?.shippingDetails?.address?.city}></DetailsBox>
            <DetailsBox title='Street' description={selectedOrder?.shippingDetails?.address?.street}></DetailsBox>
            <DetailsBox title='ZipCode' description={selectedOrder?.shippingDetails?.address?.zipCode}></DetailsBox>
          </>
        )}></DetailsBox>
        <DetailsBox title='Contact Number' description={selectedOrder?.shippingDetails.contactNumber}></DetailsBox>
        <DetailsBox title='Order Type' description={selectedOrder?.shippingDetails?.orderType}></DetailsBox>
        <DetailsBox title='User Name' description={selectedOrder?.userName}></DetailsBox>
        <DetailsBox title='User Email' description={selectedOrder?.userEmail}></DetailsBox>
        <DetailsBox title='Cart Items' description={selectedOrder?.cartItems?.map((item, index) => (
          <Box
            m="0px"
            sx={{
              p: "20px",
              width: "100%"
            }}
            key={index}>
            <DetailsBox title='Product ID' description={item.productId}></DetailsBox>
            <DetailsBox title='Name' description={item.name}></DetailsBox>
            <DetailsBox title='Description' description={item.description}></DetailsBox>
            <DetailsBox title='Price' description={item.salePrice && `${item.salePrice} $`}></DetailsBox>
            <DetailsBox title='Quantity' description={item.quantity.toString()}></DetailsBox>
            <DetailsBox title='Discount' description={item.discount.toString()}></DetailsBox>
            <DetailsBox title=' Image URL' description={item.image.url}></DetailsBox>
          </Box>
        ))} isCartItems={true}></DetailsBox>
        {isEditMode && (
          <>
            <Button sx={{ color: colors.lightBlue[700] }} onClick={handleSave}>Save</Button>
            <Button sx={{ color: colors.lightBlue[700] }} onClick={() => setIsEditMode(false)}>Cancel</Button>
          </>
        )}
        {!isEditMode && (
          <Button sx={{ color: colors.lightBlue[700] }} onClick={handleEdit}>
            <EditIcon sx={{ color: colors.lightBlue[700] }} />
          </Button>
        )}
      </DialogContent>
    </Box>
  );
};

export default OrderDetails;
