import { MyContext } from "./../../../types/myTypes";
import { LoginResponse } from "./type";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { passCompare, getAccessToken, getRefreshToken } from "./../../../utils/authUtils";
import { invalidLogin } from "./../../../utils/constants";
import { User } from "./../../../entity/User";

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw Error(invalidLogin);
    const valid = passCompare(password, user.password);
    if (!valid) throw Error(invalidLogin);
    const accessToken = getAccessToken({ id: user.id, email: user.email });
    const refreshToken = getRefreshToken({ id: user.id });

    res.cookie("rt", refreshToken);

    return { accessToken };
  }
}
