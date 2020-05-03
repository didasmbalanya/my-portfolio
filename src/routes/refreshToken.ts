import { sendRefreshToken } from "./../utils/authUtils";
import { User } from "./../entity/User";
import { RequestHandler } from "express";
import { cookiename } from "../utils/constants";
import {
  jwtVerifyCustom,
  getAccessToken,
} from "../utils/authUtils";

export const resfreshTokenHandler: RequestHandler = async (req, res) => {
  try {
    const cookie = req.cookies[cookiename];
    if (!cookie) throw Error();
    const RefreshToken = cookie.split("=").pop()!;

    const valid = jwtVerifyCustom(RefreshToken, "refresh");
    if (!valid) throw Error();

    const { userId } = valid as any;
    const user = await User.findOne(userId);
    if (!user) throw Error();

    const accessToken = getAccessToken({ userId: user.id, email: user.email });

    sendRefreshToken(user.id, res);
    res.status(200).send({ accessToken });
  } catch (error) {
    res.status(400).send({ accessToken: null });
  }
};
