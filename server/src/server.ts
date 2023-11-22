import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import userRoutes from './routes/userRoutes';
  
import {config} from "dotenv"

import ordersRoutes from './routes/ordersRoutes';
import connectToDatabase from './configs/connectToMongogoDB';
import orderModel from './Schemas/OrderModel.js';

const port = 3000
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());



app.use('/api/users', userRoutes);
app.use('/api/orders', ordersRoutes);


// new orderModel()

app.listen(port, () => {
  connectToDatabase()
  console.log(`server is running at port ${port}`);
});

export default app;