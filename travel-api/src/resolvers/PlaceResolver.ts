import {
  Arg,
  Ctx,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  PubSub,
  Subscription,
  Root,
  Publisher,
} from 'type-graphql';
import { plainToClass } from 'class-transformer';
import { Place } from '../entity/Place';
import { PlaceInput } from '../graphql-types/PlaceInput';
import { MyContext } from '../types';
import { getUserId } from '../utils';
import { User_2 } from '../entity/User_2';

enum Topic {
  PlaceAdded = 'NEW_PLACE_ADDED',
}

@Resolver(Place)
export class PlaceResolver {
  @Query(() => Place, { nullable: true })
  async place(@Arg('id', () => Int) id: number): Promise<Place | null> {
    return await Place.findOne(id, { relations: ['user'] });
  }

  @Query(() => [Place])
  async places(): Promise<Place[]> {
    return await Place.find({ relations: ['user'] });
  }

  @Mutation(() => Place)
  async createPlace(
    @Arg('place') placeInput: PlaceInput,
    @Ctx() { req }: MyContext,
    @PubSub(Topic.PlaceAdded) publish: Publisher<Place>
  ): Promise<Place> {
    const userId = getUserId(req);
    if (userId) {
      const place = plainToClass(Place, {
        ...placeInput,
        creationDate: new Date(),
      });
      const user = await User_2.findOne(userId);
      const newPlace = await Place.create({ ...place, user }).save();
      await publish(newPlace);
      return newPlace;
    }
    throw new Error('User not found');
  }

  @Mutation(() => Place)
  async updatePlace(
    @Arg('place') placeInput: PlaceInput,
    @Ctx() { req }: MyContext
  ): Promise<Place> {
    const userId = getUserId(req);
    if (userId) {
      const { id, title, description, imageUrl } = placeInput;
      const place = await Place.findOne({
        where: { id, user: { id: userId } },
        relations: ['user'],
      });
      if (place) {
        place.title = title;
        place.description = description;
        place.imageUrl = imageUrl;
        await place.save();
        return place;
      }
      throw new Error('Place not found');
    }
    throw new Error('User not found');
  }

  @Mutation(() => ID)
  async deletePlace(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<number | undefined> {
    const userId = getUserId(req);
    if (userId) {
      const deleted = await Place.delete({ id, user: { id: userId } });
      if (deleted) {
        return id;
      }
      throw new Error('Place not deleted');
    }
    throw new Error('User not found');
  }

  @Subscription(() => Place, { topics: Topic.PlaceAdded })
  newPlaceAdded(@Root() place: Place): Place {
    return place;
  }
}
