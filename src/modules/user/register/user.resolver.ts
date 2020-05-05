import { hasher } from "../../../utils/authUtils";
import { User } from "../../../entity/User";
import { RegisterInput } from "./user.input";
import { Resolver, Mutation, Arg, Query, UseMiddleware } from "type-graphql";
import { sanitize } from "class-sanitizer";

@Resolver()
export class UserResolver {
  @Query(() => String)
  dummy() {
    return "dummy";
  }

  @Mutation(() => Boolean)
  @UseMiddleware(({ args }, next) => {
    sanitize(args.registerInput);
    args.registerInput.gender = args.registerInput.gender.toLowerCase();
    return next();
  })
  async register(@Arg("registerInput") registerInput: RegisterInput) {
    console.log(">>>>>>> rec", registerInput);
    registerInput.password = await hasher(registerInput.password);
    const user = await User.create(registerInput).save();
    console.log(">>>>>>> created", user);
    return !!user;
  }
}
