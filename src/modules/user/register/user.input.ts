import { InputType, Field,  } from "type-graphql";
import { Trim, NormalizeEmail } from "class-sanitizer";
import {
  haveUppercase,
  haveDigits,
  haveLowercase,
} from "../../../utils/constants";
import {
  Length,
  IsEmail,
  Matches,
  IsFQDN,
  IsPhoneNumber,
} from "class-validator";

@InputType()
export class RegisterInput {
  @Field()
  @Trim()
  title: string;

  @Field({ nullable: true })
  @Length(2, 255)
  @Trim()
  description?: string;

  @Field()
  @Length(2, 255)
  @Trim()
  firstname: string;

  @Field()
  @Length(2, 255)
  @Trim()
  lastname: string;

  @Field({ nullable: true })
  @Length(2, 255)
  @Trim()
  username: string;

  @Field()
  @IsEmail()
  @NormalizeEmail()
  @Trim()
  email: string;

  @Field()
  @Trim()
  gender: string;

  @Field()
  @Length(5, 255)
  @Matches(/(?=.*[a-z])/, { message: haveLowercase })
  @Matches(/(?=.*[A-Z])/, { message: haveUppercase })
  @Matches(/(?=.*[0-9])/, { message: haveDigits })
  @Trim()
  password: string;

  @Field({ nullable: true })
  @IsFQDN()
  @Trim()
  github: string;

  @Field({ nullable: true })
  @IsFQDN()
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
