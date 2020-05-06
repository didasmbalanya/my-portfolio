import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Response } from "express";
import { cookiename } from "./constants";

const accessSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET!;

export const hasher = (value: string): Promise<string> => hash(value, 10);
export const passCompare = (password: string, encrypted: string) =>
  compare(password, encrypted);

export const getAccessToken = (data: any): string =>
  sign(data, accessSecret, { expiresIn: "15m" });

export const getRefreshToken = (data: any): string =>
  sign(data, refreshSecret, { expiresIn: "7d" });

export const jwtVerifyCustom = (token: string, tokenType = "access") => {
  const secret =
    tokenType.toLowerCase() === "access" ? accessSecret : refreshSecret;
  return verify(token, secret);
};

export const sendRefreshToken = (
  userId: number,
  tokenVersion: number,
  res: Response
) => {
  const refreshToken = getRefreshToken({ userId, tokenVersion });
  res.cookie(cookiename, refreshToken, {
    path: "refresh_token",
  });
};
