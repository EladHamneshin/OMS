import request from "supertest";

// import ordersRoutes from "../dal/orderDal";
import app from "../../dist/server";






test('use spi/orders and get 200 status', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.status).toEqual(200);
}, 10000);

 
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
    const response = await request(app).post('/api/orders')
      .send({
        cartItems: [
          {
            productId: "21",
            name: "Produc3 1",
            description: "Description 1",
            salePrice: 50,
            quantity: 2,
            discount: 0,
            image: {
              url: "https://example.com/product-image.jpg",
            },
          },
        ],
        userId: "user21שש1",
        userName: "John yy",
        userEmail: "johan.doe@example.com",
        orderTime: "2023-11-22T12:00:00.000Z",
        status: "Waiting",
        totalPrice: 100,
        shippingDetails: {
          address: {
            country: "Israel",
            city: "Tel Aviv",
            street: "Main Street",
            zipCode: 12345,
          },
          contactNumber: "123456789",
          orderType: "SelfCollection",
        },
        contactNumber: "123456789",
      }
      );

    expect(response.status).toBe(201);
    // Add more assertions based on your application's behavior
  });
});



// describe('PUT /api/orders/:orderId', () => {
//   test('should update an existing order', async () => {
//     // Assume orderId is a valid order ID in your application
//     const orderId = '655f3c0c05eb2e8e4ac6d91e';

//     const response = await request(app)
//       .put(`/api/orders/${orderId}`)
//       .send({
//         // Update the order with new data
//         status: 'Shipped',
//         // Add other fields to update based on your application's requirements
//       });

//     // Assertions
  
   
//   });
// });
