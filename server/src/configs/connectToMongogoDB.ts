import mongoose from 'mongoose'

const connectToDatabase = async () => {

    try {
        const port = process.env.MONGO_URI!
        await mongoose.connect(port);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectToDatabase