import mongoose from 'mongoose';
import orderModel from '../models/OrderModel.js'; 

const connectToDatabase = async () => {
    try {
        const connectionString = process.env.MONGO_URI!;
        console.log(connectionString);
        
        await mongoose.connect(connectionString);

        const order = new orderModel(); 
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectToDatabase;
