import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const hasher = (value: string): Promise<string> => hash(value, 10);
export const passCompare = (password: string, encrypted: string) =>
  compare(password, encrypted);

export const getAccessToken = (data: any): string =>
  sign(data, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });

export const getRefreshToken = (data: any): string =>
  sign(data, process.env.REFRESH_TOKEN_SECRET!);
