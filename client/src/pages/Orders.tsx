import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import order from "../types/orderType";
import ordersApi from '../api/ordersApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'userName', headerName: 'User Name', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'totalPrice', headerName: 'Total Price', width: 150, type: 'number' },
];

const OrderDetails = ({ selectedOrder }: { selectedOrder: order, onClose: () => void }) => (
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

const OrdersComponent = () => {
  const [rows, setRows] = useState<order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<order | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: order[] = await ordersApi.getAllOrders();
      const formattedData = data.map((order) => ({
        ...order,
        id: order._id,
        cart: order.cartItems,
        userName: order.userName,

      }));
      setRows(formattedData);
    };

    fetchData();
  }, []);

  const handleRowClick = (params: GridRowParams<order>) => {
    const selectedRow = rows.find((row) => row._id === params.id);
    setSelectedOrder(selectedRow!);
  };
  const navigate = useNavigate();
  useEffect(() => {
      const isAdmin = localStorage.getItem('admin');
      if (!isAdmin) {
          navigate('/login');
      }
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={handleRowClick}
        getRowId={(row) => row._id}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
        {selectedOrder && <OrderDetails selectedOrder={selectedOrder} onClose={() => setSelectedOrder(null)} />}
      </Dialog>
    </Box>
  );
};

export default OrdersComponent;
