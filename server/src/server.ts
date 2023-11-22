import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import ordersRoutes from './routes/ordersRoutes';
import connectToDatabase from './configs/connectToMongogoDB';


const app = express();

dotenv.config()
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// app.use('/api/users', userRoutes);
app.use('/api/orders', ordersRoutes);

const port = process.env.PORT

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
