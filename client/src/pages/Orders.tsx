import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import order from "../types/orderType";
import ordersApi from '../api/ordersApi';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import OrderDetails from '../components/OrderDetails';
import Graph from './graph';
import './style/ordersStyle.css'
import { UserContext } from '../userContext';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'userName', headerName: 'User Name', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'totalPrice', headerName: 'Total Price', width: 150, type: 'number' },
  { field: 'orderTime', headerName: 'order time', width: 150, type:'string' },

];

const OrdersComponent = () => {
  const [rows, setRows] = useState<order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<order | null>(null);
  const [refresh,setRefresh]=useState(false);
  const userContext = useContext(UserContext);

  
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

      if (!userContext?.userInfo) {
        navigate('/oms/login');
      }
    };

    fetchDataAndCheckAdmin();
  }, [navigate, refresh, userContext?.userInfo]);

  function refreshFunc()
  {
    setRefresh(!refresh);
  }
 

  const handleRowClick = (params: GridRowParams<order>) => {
    const selectedRow = rows.find((row) => row._id === params.id);
    setSelectedOrder(selectedRow!);
  };

  return (
    <div className='ordersGrid'>
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
          {selectedOrder && <OrderDetails selectedOrder={selectedOrder} close={() => setSelectedOrder(null)} Refresh={refreshFunc} />}
        </Dialog>
        <div className='ordersGraph'>
          <Graph />
        </div>
      </Box>
    </div>
  );
};

export default OrdersComponent;
