import * as mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connections[0].readyState)
        return;

    if (!process.env.MONGO_CONNECTION_STRING)
        throw new Error('no db string');
    const connectionURI = process.env.MONGO_CONNECTION_STRING;

    await mongoose.connect(connectionURI, { dbName: 'vlctips', serverSelectionTimeoutMS: 1000 });
};

export default connectDB;
