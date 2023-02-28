import * as mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { createMiddlewareDecorator, NextFunction } from "next-api-decorators";

export const DB = createMiddlewareDecorator(async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
  if (mongoose.connections[0].readyState) return next();

  if (!process.env.MONGO_CONNECTION_STRING) throw new Error("no db string");
  const connectionURI = process.env.MONGO_CONNECTION_STRING;

  await mongoose.connect(connectionURI, { dbName: "vlctips", serverSelectionTimeoutMS: 1000 });
  next();
});
