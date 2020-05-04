import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: TokenPayload;
}

export interface TokenPayload {
  userId?: number
  tokenVersion?: number
}
