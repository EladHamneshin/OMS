import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import order from "../types/orderType";
import ordersApi from '../api/ordersApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import OrderDetails from '../components/OrderDetails';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'userName', headerName: 'User Name', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'totalPrice', headerName: 'Total Price', width: 150, type: 'number' },
];

const OrdersComponent = () => {
  const [rows, setRows] = useState<order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<order | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchDataAndCheckAdmin = async () => {
      const data: order[] = await ordersApi.getAllOrders();
      const formattedData = data.map((order) => ({
        ...order,
        id: order._id,
        cart: order.cartItems,
        userName: order.userName,
      }));

      setRows(formattedData);

      // Check if the user is an login
      const isAdmin = localStorage.getItem('admin');
      if (!isAdmin) {
        navigate('/login');
      }
    };

    fetchDataAndCheckAdmin();
  }, [navigate]);

  const handleRowClick = (params: GridRowParams<order>) => {
    const selectedRow = rows.find((row) => row._id === params.id);
    setSelectedOrder(selectedRow!);
  };

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
