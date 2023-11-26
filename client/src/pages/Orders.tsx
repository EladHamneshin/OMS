import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';


interface OrderInterface {
    id: any;
    _id: string;
    cart: ProductInterface[];
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

enum OrderEnum {
    Express = "Express",
    Regular = "Regular",
    SelfCollection = "SelfCollection",
}

enum OrderStatusEnum {
    Waiting = "Waiting",
    Sent = "Sent",
    Received = "Received",
    Canceled = "Canceled",
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'userName', headerName: 'User Name', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'totalPrice', headerName: 'Total Price', width: 150, type: 'number' },
];

const OrderDetails = ({ selectedOrder }: { selectedOrder: OrderInterface, onClose: () => void }) => (
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
            {selectedOrder?.cart?.map((item, index) => (
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
                    <hr />
                </div>
            ))}
        </DialogContent>
    </>
);

const OrdersComponent = () => {
    const [rows, setRows] = React.useState<OrderInterface[]>([]);
    const [selectedOrder, setSelectedOrder] = React.useState<OrderInterface | null>(null);

    React.useEffect(() => {
        fetch('http://localhost:3000/api/orders')
            .then((response) => response.json())
            .then((data) => {
                // console.log('API Response:', data);

                if (Array.isArray(data)) {
                    const formattedData = data.map((order) => ({
                        ...order.order,  // Keep this line if 'order' is necessary
                        id: order._id,
                        cart: order.order.cartItems,
                        userName: order.order.userName,
                    }));
                    // console.log(data.map(order => order._id));

                    setRows(formattedData);
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleRowClick = (params: any) => {
        const selectedRow = rows.find((row) => row.id === params.id);
        setSelectedOrder(selectedRow!);
    };
    // console.log("rows2",rows);
    

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                // pageSize={5}
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
            <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
                {selectedOrder && <OrderDetails selectedOrder={selectedOrder} onClose={() => setSelectedOrder(null)} />}
            </Dialog>
        </Box>
    );
};

export default OrdersComponent;
