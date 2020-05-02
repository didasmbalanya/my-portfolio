import { noAuth } from "./../../../utils/constants";
import { MyContext } from "./../../../types/myTypes";
import { isAuth } from "./../../shared/authMiddleware";
import { User } from "./../../../entity/User";
import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";

@Resolver()
export class meReslver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext) {
    if (!payload || !payload.userId) throw Error(noAuth);

  const user = await User.findOne(payload.userId)

    return user;
  }
}
