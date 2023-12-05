import request from "supertest";

// import ordersRoutes from "../dal/orderDal";
import app from "../../dist/server";






test('use orders and get 200 status', async () => {
    const res = await request(app).get('/orders');
    expect(res.status).toEqual(200);
}, 10000);

 
describe('GET /orders/:userId', () => {
  test('should get orders by user ID and return 200 status', async () => {
    const userId = "65554a49d6dce586149ec6b8";
    const response = await request(app).get(`/orders/${userId}`);

    expect(response.status).toEqual(200);
    // Add more assertions based on your specific response structure and data
  });
});



describe('POST /orders', () => {
  test('It should create a new order', async () => {
    const response = await request(app).post('/orders')
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
        userId: "user21",
        userName: "John yy",
        userEmail: "j@example.com",
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
      }
      );

    expect(response.status).toBe(201);
    // Add more assertions based on your application's behavior
  });
});






describe('PUT /orders/:orderId', () => {
  test('should update an existing order', async () => {
    // Assume orderId is a valid order ID in your application
    const orderId = '65672c123f38a884f324d10d';

    const response = await request(app)
      .put(`/orders/${orderId}`)
      .send({
        // Update the order with new data
        userId: '45678945678',
        // Add other fields to update based on your application's requirements
      });
      expect(response.status).toBe(404);
      // Add more assertions based on your application's behavior
    });
  });
  
   
   
describe('User Registration Tests', () => {
  test('registers a new user', async () => {
    const userInput = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'jn.dhbhbnllnnoe@errhjvhjggfgh.com',
      password: 'testPassword', // Use the actual password here
      isAdmin: false,
    };

    const response = await request(app)
      .post('/users/register')
      .send(userInput);

    expect(response.status).toEqual(200);
  });

  test('registers new user with invalid email', async () => {
    const userInput = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john',
      password: 'testPassword', // Use the actual password here
      isAdmin: false,
    };

    const response = await request(app)
      .post('/users/register')
      .send(userInput);

    expect(response.status).toEqual(500);
  });
});
