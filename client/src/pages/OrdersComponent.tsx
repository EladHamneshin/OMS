import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface OrderInterface {
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

export interface ChangeStatusBody {
  status: OrderStatusEnum;
}

const OrdersComponent: React.FC = () => {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(null);

  useEffect(() => {
    // Fetch orders from the server using the token information in the request
    // Make sure to include the token in the request header
    fetch("http://localhost:3000/api/orders", {})
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleLearnMore = (order: OrderInterface) => {
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <Card key={order.orderTime.toString()} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Order by {order.userName}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Email: {order.userEmail}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order Time: {order.orderTime.toString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {order.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Price: {order.totalPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Shipping Address: {order.shippingDetails.address.street},{" "}
              {order.shippingDetails.address.city},{" "}
              {order.shippingDetails.address.country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact Number: {order.shippingDetails.contactNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order Type: {order.shippingDetails.orderType}
            </Typography>
          </CardContent>
          {/* You can add more details or actions as needed */}
          <Button size="small" onClick={() => handleLearnMore(order)}>
            Learn More
          </Button>
        </Card>
      ))}
      {/* Modal for detailed order information */}
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
    </div>
  );
};

export default OrdersComponent;
