import { InputType, Field } from "type-graphql";
import { Trim } from "class-sanitizer";
import {
  haveUppercase,
  haveDigits,
  haveLowercase,
} from "../../../utils/constants";
import {
  Length,
  IsEmail,
  Matches,
  IsPhoneNumber,
  IsIn,
} from "class-validator";

@InputType()
export class RegisterInput {
  @Field()
  @Trim()
  title: string;

  @Field({ nullable: true })
  @Trim()
  description?: string;

  @Field()
  @Trim()
  firstname: string;

  @Field()
  @Trim()
  lastname: string;

  @Field({ nullable: true })
  @Trim()
  username: string;

  @Field()
  @Trim()
  @IsEmail()
  email: string;

  @Field()
  @Trim()
  @IsIn(["male", "female", "other"])
  gender: string;

  @Field()
  @Length(5, 255)
  @Matches(/(?=.*[a-z])/, { message: haveLowercase })
  @Matches(/(?=.*[A-Z])/, { message: haveUppercase })
  @Matches(/(?=.*[0-9])/, { message: haveDigits })
  @Trim()
  password: string;

  @Field({ nullable: true })
  @Trim()
  github: string;

  @Field({ nullable: true })
  @Trim()
  linkedin: string;

  @Field()
  @IsPhoneNumber(null)
  @Trim()
  phone: string;

  @Field({ nullable: true })
  @IsPhoneNumber(null)
  @Trim()
  phoneAlt: string;
}
