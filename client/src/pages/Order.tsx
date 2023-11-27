// import * as React from "react";
// import Box from "@mui/material/Box";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { useState } from "react";
// import TextField from "@mui/material/TextField";

// interface OrderInterface {
// 	_id: string;
// 	cartItems: ProductInterface[];
// 	userId: string;
// 	userName: string;
// 	userEmail: string;
// 	orderTime: Date;
// 	status: OrderStatusEnum;
// 	totalPrice: number;
// 	shippingDetails: {
// 		address: {
// 			country: string;
// 			city: string;
// 			street: string;
// 			celPhone: number;
// 			zipCode: number;
// 		};
// 		contactNumber: string;
// 		orderType: OrderEnum;
// 	};
// }

// interface ProductInterface {
// 	productId: string;
// 	name: string;
// 	description: string;
// 	price: number;
// 	quantity: number;
// }

// export enum OrderEnum {
// 	Express = "Express",
// 	Regular = "Regular",
// 	SelfCollection = "SelfCollection",
// }

// export enum OrderStatusEnum {
// 	Waiting = "Waiting",
// 	Sent = "Sent",
// 	Received = "Received",
// 	Canceled = "Canceled",
// }

// const columns: GridColDef[] = [
// 	{ field: "_id", width: 200 },
// 	{ field: "userName", headerName: "User Name", width: 150 },
// 	{ field: "status", headerName: "Status", width: 150 },
// 	{
// 		field: "totalPrice",
// 		headerName: "Total Price",
// 		width: 150,
// 		type: "number",
// 	},
// ];

// interface OrderFormProps {
// 	order: OrderInterface;
// 	onCancel: () => void;
// 	onSubmit: (updatedOrder: OrderInterface) => void;
// }

// interface OrderFormProps {
// 	order: OrderInterface;
// 	onCancel: () => void;
// 	onSubmit: (updatedOrder: OrderInterface) => void;
// }

// const OrderForm: React.FC<OrderFormProps> = ({ order, onCancel, onSubmit }) => {
// 	const [updatedOrder, setUpdatedOrder] = React.useState<OrderInterface>({
// 		...order,
// 	});

// 	const handleChange = (field: string, value: any) => {
// 		setUpdatedOrder((prevOrder) => ({
// 			...prevOrder,
// 			shippingDetails: {
// 				...prevOrder.shippingDetails,
// 				address: {
// 					...prevOrder.shippingDetails.address,
// 					[field]: value,
// 				},
// 			},
// 		}));
// 	};

// 	const handleSubmit = async () => {
// 		try {
// 			// Validate and submit the updated order
// 			// You may want to add further validation here

// 			// Call the onSubmit function with the updated order
// 			await onSubmit(updatedOrder);
// 		} catch (error) {
// 			console.error("Error submitting order:", error);
// 		}
// 	};

// 	return (
// 		<>
// 			<TextField
// 				label="New Country"
// 				value={updatedOrder.shippingDetails.address.country}
// 				onChange={(e) => handleChange("country", e.target.value)}
// 			/>

// 			<Button onClick={handleSubmit}>Submit</Button>
// 			<Button onClick={onCancel}>Cancel</Button>
// 		</>
// 	);
// };

// export default function OrdersComponent() {
// 	const [rows, setRows] = React.useState<OrderInterface[]>([]);
// 	const [selectedOrder, setSelectedOrder] =
// 		React.useState<OrderInterface | null>(null);
// 	const [editingOrder, setEditingOrder] = React.useState<OrderInterface | null>(
// 		null
// 	);

// 	const fetchData = async () => {
// 		try {
// 			// Fetch data from an API endpoint
// 			const response = await fetch("http://localhost:3000/api/orders");
// 			const data = await response.json();

// 			// Map data to match the DataGrid columns
// 			const formattedData = data.map((order: OrderInterface) => ({
// 				...order,
// 				id: order._id, // Map _id to id
// 			}));

// 			setRows(formattedData);
// 		} catch (error) {
// 			console.error("Error fetching data:", error);
// 		}
// 	};

// 	React.useEffect(() => {
// 		fetchData();
// 	}, []);

// 	const handleRowClick = (params: any) => {
// 		// Retrieve the selected order based on the clicked row
// 		const selectedRow = rows.find((row) => row.id === params.id);
// 		setSelectedOrder(selectedRow);
// 	};

// 	const handleEditClick = () => {
// 		setEditingOrder(selectedOrder);
// 	};

// 	const handleFormSubmit = async (updatedOrder: OrderInterface) => {
//     try {
//       // Create an object containing only the changed field
//       const updatedField = {
//         shippingDetails: {
//           address: {
//             country: updatedOrder.shippingDetails.address.country,
//           },
//         },
//       };
  
//       // Send the updated field data to the server
//       const response = await fetch(`http://localhost:3000/api/orders/${updatedOrder._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedField),
//       });
  
//       if (!response.ok) {
//         // Handle non-successful response (e.g., show an error message)
//         console.error('Failed to update order:', response.statusText);
//         return;
//       }
  
//       // Update the local state with the new data
//       const data = await response.json();
//       const updatedRows = rows.map((row) =>
//         row.id === data._id ? { ...row, ...data } : row
//       );
//       setRows(updatedRows);
//       setEditingOrder(null);
//     } catch (error) {
//       console.error('Error updating order:', error);
//     }
//   };
  
// 	const handleClose = () => {
// 		// Close the dialog and reset the editing order state
// 		setSelectedOrder(null);
// 		setEditingOrder(null);
// 	};

// 	return (
// 		<Box sx={{ height: 400, width: "100%" }}>
// 			<DataGrid
// 				rows={rows}
// 				columns={columns}
// 				pageSize={5}
// 				onRowClick={handleRowClick}
// 				initialState={{
// 					pagination: {
// 						paginationModel: {
// 							pageSize: 5,
// 						},
// 					},
// 				}}
// 				pageSizeOptions={[5]}
// 				checkboxSelection
// 				disableRowSelectionOnClick
// 			/>

// 			<Dialog open={!!selectedOrder} onClose={handleClose}>
// 				{selectedOrder && (
// 					<>
// 						<DialogTitle>Order Details</DialogTitle>
// 						<DialogContent>
// 							<Typography variant="h5" component="div">
// 								Order by {selectedOrder.userName}
// 							</Typography>
// 							<Typography variant="h5" component="div">
// 								Order by {selectedOrder._id}
// 							</Typography>

// 							<Typography variant="body2" color="text.secondary">
// 								Order Time: {selectedOrder.orderTime.toString()}
// 							</Typography>
// 							<Typography variant="body2" color="text.secondary">
// 								Status: {selectedOrder.status}
// 							</Typography>
// 							<Typography variant="body2" color="text.secondary">
// 								Total Price: {selectedOrder.totalPrice}
// 							</Typography>
// 							<Typography variant="body2" color="text.secondary">
// 								Shipping Address: {selectedOrder.shippingDetails.address.street}
// 								, {selectedOrder.shippingDetails.address.city},{" "}
// 								{selectedOrder.shippingDetails.address.country}
// 							</Typography>
// 							<Typography variant="body2" color="text.secondary">
// 								Contact Number: {selectedOrder.shippingDetails.contactNumber}
// 							</Typography>
// 							<Typography variant="body2" color="text.secondary">
// 								Order Type: {selectedOrder.shippingDetails.orderType}
// 							</Typography>
// 							<Typography variant="h6">Cart Items:</Typography>
// 							{selectedOrder.cartItems.map((item, index) => (
// 								<div key={index}>
// 									<Typography variant="body2" color="text.secondary">
// 										Product ID: {item.productId}
// 									</Typography>
// 									<Typography variant="body2" color="text.secondary">
// 										Name: {item.name}
// 									</Typography>
// 									<Typography variant="body2" color="text.secondary">
// 										Description: {item.description}
// 									</Typography>
// 									<Typography variant="body2" color="text.secondary">
// 										Price: {item.price}
// 									</Typography>
// 									<Typography variant="body2" color="text.secondary">
// 										Quantity: {item.quantity}
// 									</Typography>
// 									{/* Add more details as needed */}
// 									<hr />
// 								</div>
// 							))}
// 							{editingOrder && (
// 								<OrderForm
// 									order={editingOrder}
// 									onCancel={() => setEditingOrder(null)}
// 									onSubmit={handleFormSubmit}
// 								/>
// 							)}
// 							{!editingOrder && (
// 								<Button variant="contained" onClick={handleEditClick}>
// 									Edit Order
// 								</Button>
// 							)}
// 						</DialogContent>
// 					</>
// 				)}
// 			</Dialog>
// 		</Box>
// 	);
// }
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface OrderInterface {
  _id: string;
  cartItems: ProductInterface[];
  userId: string;
  userName: string;
  userEmail: string;
  orderTime: {
    $date: string;
  };
  status: string;
  totalPrice: number;
  shippingDetails: {
    address: {
      country: string;
      city: string;
      street: string;
      zipCode: number;
    };
    contactNumber: string;
    orderType: string;
  };
}

interface ProductInterface {
  productId: string;
  name: string;
  description: string;
  salePrice: number;
  quantity: number;
  discount: number;
  image: {
    url: string;
  };
  _id: {
    $oid: string;
  };
}

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 200 },
  { field: "userName", headerName: "User Name", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "totalPrice", headerName: "Total Price", width: 150, type: "number" },
];

interface OrderFormProps {
  order: OrderInterface;
  onCancel: () => void;
  onSubmit: (updatedOrder: Partial<OrderInterface>) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onCancel, onSubmit }) => {
  const [updatedOrder, setUpdatedOrder] = React.useState<Partial<OrderInterface>>({});

  const handleChange = (field: string, value: any) => {
    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      shippingDetails: {
        ...prevOrder.shippingDetails,
        address: {
          ...prevOrder.shippingDetails?.address,
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate and submit the updated order
      // You may want to add further validation here

      // Call the onSubmit function with the updated order
      await onSubmit(updatedOrder);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <>
      {/* Add new fields for the address */}
      <TextField
        label="New Country"
        value={updatedOrder.shippingDetails?.address?.country || ""}
        onChange={(e) => handleChange("country", e.target.value)}
      />
      <TextField
        label="New City"
        value={updatedOrder.shippingDetails?.address?.city || ""}
        onChange={(e) => handleChange("city", e.target.value)}
      />
      <TextField
        label="New Street"
        value={updatedOrder.shippingDetails?.address?.street || ""}
        onChange={(e) => handleChange("street", e.target.value)}
      />
      <TextField
        label="New Zip Code"
        value={updatedOrder.shippingDetails?.address?.zipCode || ""}
        onChange={(e) => handleChange("zipCode", e.target.value)}
      />
      {/* Add more fields as needed */}

      {/* Submit button */}
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </>
  );
};

export default function OrdersComponent() {
  const [rows, setRows] = React.useState<OrderInterface[]>([]);
  const [selectedOrder, setSelectedOrder] = React.useState<OrderInterface | null>(null);
  const [editingOrder, setEditingOrder] = React.useState<OrderInterface | null>(null);

  const fetchData = async () => {
    try {
      // Fetch data from an API endpoint
      const response = await fetch("http://localhost:3000/api/orders");
      const data = await response.json();

      // Map data to match the DataGrid columns
      const formattedData = data.map((order: OrderInterface) => ({
        ...order,
        id: order._id, // Map _id to id
      }));

      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (params: any) => {
    // Retrieve the selected order based on the clicked row
    const selectedRow = rows.find((row) => row.id === params.id);
    setSelectedOrder(selectedRow);
  };

  const handleEditClick = () => {
    setEditingOrder(selectedOrder);
  };

  const handleFormSubmit = async (updatedOrder: Partial<OrderInterface>) => {
    try {
      // Send updated order data to the server
      const response = await fetch(`http://localhost:3000/api/orders/${updatedOrder._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        // Handle non-successful response (e.g., show an error message)
        console.error("Failed to update order:", response.statusText);
        return;
      }

      const data = await response.json();

      // Update the local state with the new data
      const updatedRows = rows.map((row) =>
        row._id === data._id ? { ...row, ...data } : row
      );
      setRows(updatedRows);
      setEditingOrder(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleClose = () => {
    // Close the dialog and reset the editing order state
    setSelectedOrder(null);
    setEditingOrder(null);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
              <Typography variant="h5" component="div">
                Order by {selectedOrder._id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order Time: {selectedOrder.orderTime.$date}
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
                    Price: {item.salePrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  {/* Add more details as needed */}
                  <hr />
                </div>
              ))}
              {editingOrder && (
                <OrderForm
                  order={editingOrder}
                  onCancel={() => setEditingOrder(null)}
                  onSubmit={handleFormSubmit}
                />
              )}
              {!editingOrder && (
                <Button variant="contained" onClick={handleEditClick}>
                  Edit Order
                </Button>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
