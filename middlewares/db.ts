import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connections[0].readyState)
        return;

    if (!process.env.MONGO_CONNECTION_STRING)
        throw new Error('no db string');
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
};

export default connectDB;
