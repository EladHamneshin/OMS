import mongoose from 'mongoose'

const connectToDatabase = async () => {

    try {
        
        await mongoose.connect('mongodb://127.0.0.1:27017/OMS');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectToDatabase