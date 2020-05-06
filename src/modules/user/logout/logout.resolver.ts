import { sendRefreshToken } from "./../../../utils/authUtils";
import { MyContext } from "./../../../types/myTypes";
import { User } from "./../../../entity/User";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logoutAll(@Arg("userId") userId: number) {
    try {
      await User.getRepository().increment({ id: userId }, "tokenVersion", 1);
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(0, 0, res);
    return true;
  }
}
