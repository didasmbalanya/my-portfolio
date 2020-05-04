import { TokenPayload } from "./../types/myTypes";
import { sendRefreshToken } from "./../utils/authUtils";
import { User } from "./../entity/User";
import { RequestHandler } from "express";
import { cookiename } from "../utils/constants";
import { jwtVerifyCustom, getAccessToken } from "../utils/authUtils";

export const resfreshTokenHandler: RequestHandler = async (req, res) => {
  try {
    const cookie = req.cookies[cookiename];
    if (!cookie) throw Error();
    const RefreshToken = cookie.split("=").pop()!;

    const valid = jwtVerifyCustom(RefreshToken, "refresh");
    if (!valid) throw Error();

    const { userId, tokenVersion } = valid as TokenPayload;
    const user = await User.findOne(userId);
    if (!user) throw Error();
    if (user.tokenVersion !== tokenVersion)
      throw Error("invalid refresh token");

    const accessToken = getAccessToken({ userId: user.id, email: user.email });

    sendRefreshToken(user.id, user.tokenVersion, res);
    res.status(200).send({ accessToken });
  } catch (error) {
    res.status(400).send({ accessToken: null });
  }
};
