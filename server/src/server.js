import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import connectToDatabase from './configs/connectToMongogoDB.js';
import orderModel from './Schemas/OrderModel.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/orders', ordersRoutes);

const port = process.env.PORT || 3000 ;

const a = new orderModel()

app.listen(port, async () => {
  await connectToDatabase();
  // await connectToPg();
  console.log(`Server is running at port ${port}`);
});

export default app;
