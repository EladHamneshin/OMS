import request from "supertest";

// import ordersRoutes from "../dal/orderDal";
import app from "../server";
import ordersRoutes from "../routes/ordersRoutes";
import getOrdersByUserId from "../controllers/orderController"

describe("Test that the orders displays", () => {
  test("use spi/orders and get 200 status", async () => {
    const res = await request(app).get("/api/orders");
    expect(res.status).toEqual(200);
  });
});

 
describe('GET /api/orders/:userId', () => {
  test('should get orders by user ID and return 200 status', async () => {
    const userId = "65554a49d6dce586149ec6b8";
    const response = await request(app).get(`/api/orders/${userId}`);

    expect(response.status).toEqual(200);
    // Add more assertions based on your specific response structure and data
  });
});



describe('POST /api/orders', () => {
  test('It should create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        cartItems: [
          {
            name: 'Product A',
            description: 'Description for Product A',
            price: 10,
            quantity: 3,
          },
          {
            name: 'Product B',
            description: 'Description for Product B',
            price: 15,
            quantity: 2,
          },
        ],
        orderTime: 'Thu Jun 15 2023',
        status: 'Waiting',
        total: 85,
        shippingDetails: {
          address: {
            country: 'Country A',
            city: 'City A',
            street: '123',
            celPhone: 123456789,
            zipCode: 54321,
          },
          userId: '65554a49d6dce586149ec6b7',
          contactNumber: '987654321',
          orderType: 'Express',
        },
      });

    expect(response.status).toBe(200);
    // Add more assertions based on your application's behavior
  });
});
