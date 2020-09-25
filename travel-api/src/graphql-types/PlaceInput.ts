import { Field, InputType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PlaceInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  imageUrl: string;
}
