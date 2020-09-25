import { Field, ObjectType } from 'type-graphql';
import { User_2 } from '../entity/User_2';
import { FieldError } from './FieldError';

@ObjectType()
export class UserResponse {
  @Field(() => User_2, { nullable: true })
  user?: User_2;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
