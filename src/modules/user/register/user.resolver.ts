import { hasher } from "../../../utils/authUtils";
import { User } from "../../../entity/User";
import { RegisterInput } from "./user.input";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { sanitize } from "class-sanitizer";

@Resolver()
export class UserResolver {
  @Query(() => String)
  dummy() {
    return "dummy";
  }

  @Mutation(() => Boolean)
  async register(@Arg("registerInput") registerInput: RegisterInput) {
    sanitize(registerInput);
    registerInput.password = await hasher(registerInput.password);
    registerInput.gender = registerInput.gender.toLowerCase();

    const user = await User.create(registerInput).save();
    return !!user;
  }
}
