import { MiddlewareFn } from "type-graphql";
import { noAuth } from "./../../utils/constants";
import { jwtVerifyCustom } from "./../../utils/authUtils";
import { MyContext } from "./../../types/myTypes";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  // expects 'Bearer token`
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new Error(noAuth);
  }
  // take the last part incase 'bearer' wasn't used
  try {
    const token = authorization.split(" ").pop()!;
    const payload = jwtVerifyCustom(token, "access");
    context.payload = payload as any;
    return next();
  } catch (error) {
    throw new Error(noAuth);
  }
};
