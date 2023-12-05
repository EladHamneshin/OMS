import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import order from "../types/orderType";
import ordersApi from '../api/ordersApi';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import OrderDetails from '../components/OrderDetails';
import { useTheme } from '@mui/material';
import { tokens } from '../theme/theme';

const OrdersComponent = () => {
  const [rows, setRows] = useState<order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<order | null>(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [refresh,setRefresh]=useState(false);
  const userContext = useContext(UserContext);

  const navigate = useNavigate()

  const getStatusBackgroundColor = (status: string): string => {

    switch (status) {
      case 'Waiting':
        return colors.grey[500]
      case 'Sent':
        return colors.greenAccent[500]

      case 'Received':
        return colors.blueAccent[500]

      case 'Canceled':
        return colors.redAccent[500]

      default:
        return colors.grey[500]
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'userName', headerName: 'User Name', width: 150 },
    {
      field: 'status', headerName: 'Order Status', width: 150, renderCell: (params) => (
        <div
          style={{
            backgroundColor: getStatusBackgroundColor(params.value as string),
            color: colors.grey[500],
            padding: '8px',
            borderRadius: '4px',
          }}
        >
          {params.value}
        </div>
      ),
    },
    { field: 'totalPrice', headerName: 'Total Price', width: 150, type: 'number' },
    { field: 'orderTime', headerName: 'order time', width: 150, type: 'string' },

  ];

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

  function refreshFunc() {
    setRefresh(!refresh);
  }

const handleRowClick = (params: GridRowParams<order>) => {
  const selectedRow = rows.find((row) => row._id === params.id);
  setSelectedOrder(selectedRow!);
};

return (
  <div>
    <Box m="0px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
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
    </Box>
  </div>
);


export default OrdersComponent;
