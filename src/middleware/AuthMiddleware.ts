import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export interface Payload {
  id: number;
  email: string;
  nome: string;
}

const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.headers.authorization) {
    return response.status(401).send();
  }
  const token = request.headers.authorization.split(" ")[1];
  if (!token) {
    return response.status(401).send();
  }
  const user = verify(token, process.env.AUTH_SECRET) as Payload;
  if (!user) {
    return response.status(401).send();
  }
  response.locals.user = user;
  next();
};

export { authMiddleware };
