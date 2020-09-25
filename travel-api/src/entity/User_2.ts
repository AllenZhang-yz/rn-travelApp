import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Place } from './Place';

@ObjectType()
@Entity()
export class User_2 extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Field()
  @Column({ type: 'text', unique: true })
  username: string;

  @Column()
  password: string;

  @Field(() => [Place])
  @OneToMany(() => Place, (place) => place.user, { eager: true })
  places: Place[];
}
