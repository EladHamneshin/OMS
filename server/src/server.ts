import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import connectToDatabase from './configs/connectToMongogoDB.js';
import { connectToPg } from './configs/connectDbAdmin.js';

import orderModel from './models/OrderModel.js';
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middlewares/errorsMiddleware.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/orders', ordersRoutes);

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000;


app.listen(port, async () => {
  const a = new orderModel()

  await connectToDatabase();
  await connectToPg();
  console.log(`Server is running at port ${port}`);
});

export default app;
