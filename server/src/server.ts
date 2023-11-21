import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import connectToDatabase from './configs/connectToMongogoDB.js';
import { connectToPg } from './configs/connectDbAdmin.js';

const port = 3000;
const app = express();

config(); // Load configuration from .env file
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/orders', ordersRoutes);

app.listen(port, async () => {
  await connectToDatabase();
  await connectToPg();
  console.log(`Server is running at port ${port}`);
});
