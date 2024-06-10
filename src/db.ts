import mongoose from "mongoose";

export const connect = async () => {
	if (mongoose.connection.readyState === 1) return;
	if (!process.env.MONGO_CONNECTION_STRING) throw new Error("MONGODB_URI is not defined");
	await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
		dbName: "vlctips",
		serverSelectionTimeoutMS: 1000,
	});
};
