import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  createMiddlewareDecorator,
  ForbiddenException,
  NextFunction,
  UnauthorizedException,
} from "next-api-decorators";

const JWT_SECRET = process.env.JWT_SECRET || "this-is-a-secret";

export const Auth = (admin = false) => createMiddlewareDecorator((req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).send("forbidden");
  const [_bearer, token] = authHeader.split(" ");
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) throw new ForbiddenException();
    //@ts-ignore
    if(admin && !decoded.data.admin) throw new ForbiddenException();
  });

  next();
})();
