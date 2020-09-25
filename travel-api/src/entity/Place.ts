import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { User_2 } from './User_2';

@ObjectType()
@Entity()
export class Place extends BaseEntity {
  //Field - allowing graphql to query for the following entity column
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true, description: 'The place description' })
  @Column()
  description: string;

  @Field({ nullable: true, description: 'The place image URL' })
  @Column()
  imageUrl: string;

  @Field(() => User_2)
  @ManyToOne(() => User_2, (user) => user.places)
  user: User_2;

  @Field(() => String)
  @Column()
  creationDate: Date;
}
