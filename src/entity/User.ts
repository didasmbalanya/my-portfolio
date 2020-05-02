import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@Entity({ name: "users" })
@ObjectType()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({})
  id: number;

  @Field()
  @Column({ nullable: false })
  title: string;

  @Field()
  @Column()
  description?: string;

  @Field()
  @Column({ nullable: true })
  firstname: string;

  @Field()
  @Column({ nullable: true })
  lastname: string;

  @Field()
  @Column({ nullable: true })
  username?: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ enum: ["male", "female"] })
  gender: string;

  @Column()
  password: string;

  @Field()
  @Column()
  github: string;

  @Field()
  @Column()
  linkedin: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  phoneAlt: string;
}
