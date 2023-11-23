import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

interface OrderInterface {
  _id: string;
  cartItems: ProductInterface[];
  userId: string;
  userName: string;
  userEmail: string;
  orderTime: Date;
  status: OrderStatusEnum;
  totalPrice: number;
  shippingDetails: {
    address: {
      country: string;
      city: string;
      street: string;
      celPhone: number;
      zipCode: number;
    };
    contactNumber: string;
    orderType: OrderEnum;
  };
}

interface ProductInterface {
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export enum OrderEnum {
  Express = "Express",
  Regular = "Regular",
  SelfCollection = "SelfCollection",
}

export enum OrderStatusEnum {
  Waiting = "Waiting",
  Sent = "Sent",
  Received = "Received",
  Canceled = "Canceled",
}

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 200 },
  { field: 'userName', headerName: 'User Name', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'totalPrice', headerName: 'Total Price', width: 150, type: 'number' },
];

export default function OrdersComponent() {
  const [rows, setRows] = React.useState<OrderInterface[]>([]);
  const [selectedOrder, setSelectedOrder] = React.useState<OrderInterface | null>(null);

  React.useEffect(() => {
    // Fetch data from an API endpoint
    fetch('http://localhost:3000/api/orders')
      .then((response) => response.json())
      .then((data) => {
        // Map data to match the DataGrid columns
        const formattedData = data.map((order: OrderInterface) => ({
          ...order,
          id: order._id, // Map _id to id
        }));

        setRows(formattedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleRowClick = (params: any) => {
    // Retrieve the selected order based on the clicked row
    const selectedRow = rows.find((row) => row.id === params.id);
    setSelectedOrder(selectedRow);
  };

  const handleClose = () => {
    // Close the dialog
    setSelectedOrder(null);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <Dialog open={!!selectedOrder} onClose={handleClose}>
        {selectedOrder && (
          <>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
              <Typography variant="h5" component="div">
                Order by {selectedOrder.userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order Time: {selectedOrder.orderTime.toString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {selectedOrder.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Price: {selectedOrder.totalPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Shipping Address: {selectedOrder.shippingDetails.address.street},{" "}
                {selectedOrder.shippingDetails.address.city},{" "}
                {selectedOrder.shippingDetails.address.country}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact Number: {selectedOrder.shippingDetails.contactNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order Type: {selectedOrder.shippingDetails.orderType}
              </Typography>
              <Typography variant="h6">Cart Items:</Typography>
              {selectedOrder.cartItems.map((item, index) => (
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
                    Price: {item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  {/* Add more details as needed */}
                  <hr />
                </div>
              ))}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// interface OrderInterface {
//   _id: string;
//   cartItems: ProductInterface[];
//   userId: string;
//   userName: string;
//   userEmail: string;
//   orderTime: Date;
//   status: OrderStatusEnum;
//   totalPrice: number;
//   shippingDetails: {
//     address: {
//       country: string;
//       city: string;
//       street: string;
//       celPhone: number;
//       zipCode: number;
//     };
//     contactNumber: string;
//     orderType: OrderEnum;
//   };
// }

// interface ProductInterface {
//   productId: string;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
// }

// export enum OrderEnum {
//   Express = "Express",
//   Regular = "Regular",
//   SelfCollection = "SelfCollection",
// }

// export enum OrderStatusEnum {
//   Waiting = "Waiting",
//   Sent = "Sent",
//   Received = "Received",
//   Canceled = "Canceled",
// }

// const columns: GridColDef[] = [
//   { field: '_id', headerName: 'ID', width: 200 },
//   { field: 'userName', headerName: 'User Name', width: 150 },
//   { field: 'status', headerName: 'Status', width: 150 },
//   { field: 'totalPrice', headerName: 'Total Price', width: 150, type: 'number' },
// ];

// export default function OrdersComponent() {
//   const [rows, setRows] = React.useState<OrderInterface[]>([]);
//   const [selectedOrder, setSelectedOrder] = React.useState<OrderInterface | null>(null);
//   const [updatedOrder, setUpdatedOrder] = React.useState<OrderInterface | null>(null);

//   React.useEffect(() => {
//     // Fetch data from an API endpoint
//     fetch('http://localhost:3000/api/orders')
//       .then((response) => response.json())
//       .then((data) => {
//         // Map data to match the DataGrid columns
//         const formattedData = data.map((order: OrderInterface) => ({
//           ...order,
//           id: order._id, // Map _id to id
//         }));

//         setRows(formattedData);
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   const handleRowClick = (params: any) => {
//     // Retrieve the selected order based on the clicked row
//     const selectedRow = rows.find((row) => row.id === params.id);
//     setSelectedOrder(selectedRow);
//     setUpdatedOrder(selectedRow);
//   };

//   const handleClose = () => {
//     // Close the dialog
//     setSelectedOrder(null);
//     setUpdatedOrder(null);
//   };

//   const handleUpdate = () => {
//     // Handle the update logic here
//     // You can use the updatedOrder state to get the modified data
//     console.log("Updated Order:", updatedOrder);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Update the state when form fields change
//     setUpdatedOrder((prevOrder) => ({
//       ...prevOrder,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         onRowClick={handleRowClick}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         pageSizeOptions={[5]}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />

//       <Dialog open={!!selectedOrder} onClose={handleClose}>
//         {selectedOrder && (
//           <>
//             <DialogTitle>Order Details</DialogTitle>
//             <DialogContent>
//               {/* Display current details */}
//               <Typography variant="h5" component="div">
//                 Order by {selectedOrder.userName}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Order Time: {selectedOrder.orderTime.toString()}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Status: {selectedOrder.status}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Total Price: {selectedOrder.totalPrice}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Shipping Address: {selectedOrder.shippingDetails.address.street},{" "}
//                 {selectedOrder.shippingDetails.address.city},{" "}
//                 {selectedOrder.shippingDetails.address.country}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Contact Number: {selectedOrder.shippingDetails.contactNumber}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Order Type: {selectedOrder.shippingDetails.orderType}
//               </Typography>

//               <Typography variant="h6">Cart Items:</Typography>
//               {selectedOrder.cartItems.map((item, index) => (
//                 <div key={index}>
//                   <Typography variant="body2" color="text.secondary">
//                     Product ID: {item.productId}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Name: {item.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Description: {item.description}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Price: {item.price}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Quantity: {item.quantity}
//                   </Typography>
//                   {/* Add more details as needed */}
//                   <hr />
//                 </div>
//               ))}
//             </DialogContent>

//             {/* Update form in the dialog */}
//             <DialogContent>
//               <Typography variant="h6">Update Order</Typography>
//               <input
//                 type="text"
//                 name="userName"
//                 placeholder="User Name"
//                 value={updatedOrder.userName}
//                 onChange={handleInputChange}
//               />
//               {/* Add more input fields for other properties */}
//             </DialogContent>

//             <DialogActions>
//               <Button onClick={handleClose}>Cancel</Button>
//               <Button onClick={handleUpdate} color="primary">
//                 Update
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </Box>
//   );
// }
