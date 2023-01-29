import mongoose from "mongoose";
import { NextApiResponse } from "next";
const ValidationError = mongoose.Error.ValidationError;

const errorHandler = async (res: NextApiResponse, error: unknown) => {
  if (error instanceof ValidationError) return res.status(400).send("validation_error");
  return res.status(500).send("internal_server_error");
};

export default errorHandler;
