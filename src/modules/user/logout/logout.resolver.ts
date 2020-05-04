import { User } from './../../../entity/User';
import { Resolver, Mutation, Arg } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logoutAll(
    @Arg('userId') userId: number
  ){
    try {
      await User.getRepository().increment({ id: userId}, "tokenVersion", 1)
      return true
    } catch (error) {
      return false
    }
  }
}