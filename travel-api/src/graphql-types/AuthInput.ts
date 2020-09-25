import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AuthRegisterInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}

@InputType()
export class AuthLoginInput {
  @Field({ nullable: true })
  @IsEmail()
  @IsString()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  username?: string;

  @Field()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
