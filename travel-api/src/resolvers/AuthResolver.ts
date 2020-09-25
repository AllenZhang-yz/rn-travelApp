import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { User_2 } from '../entity/User_2';
import { AuthRegisterInput, AuthLoginInput } from '../graphql-types/AuthInput';
import { UserResponse } from '../graphql-types/UserResponse';
import { MyContext } from '../types';
import { getUserId } from '../utils';

const invalidLoginResponse = {
  errors: [
    {
      field: 'email',
      message: 'invalid login',
    },
  ],
};

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') { email, username, password }: AuthRegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (email) {
      const existingUser = await User_2.findOne({ email });
      if (existingUser) {
        return {
          errors: [
            {
              field: 'email',
              message: 'already in use',
            },
          ],
        };
      }
    }
    if (username) {
      const existingUser = await User_2.findOne({ username });
      if (existingUser) {
        return {
          errors: [
            {
              field: 'username',
              message: 'already in use',
            },
          ],
        };
      }
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User_2.create({
      email,
      username,
      password: hashedPassword,
    }).save();
    const payload = {
      id: user.id,
      username: user.username,
      password: hashedPassword,
    };
    req.session.userId = user.id;
    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || 'sdf34rfsdfsdfv!'
    );
    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { username, email, password }: AuthLoginInput,
    @Ctx() { req, res }: MyContext
  ): Promise<UserResponse> {
    if (username || email) {
      const user = username
        ? await User_2.findOne({ where: { username } })
        : await User_2.findOne({ where: { email } });
      if (!user) {
        return invalidLoginResponse;
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return invalidLoginResponse;
      }
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      req.session.userId = user.id;

      const token = jwt.sign(
        payload,
        process.env.SESSION_SECRET || 'sdf34rfsdfsdfv!'
      );
      return { user, token };
    }
    return invalidLoginResponse;
  }

  @Query(() => User_2)
  async currentUser(@Ctx() { req }: MyContext): Promise<User_2 | undefined> {
    const userId = getUserId(req);
    if (userId) {
      const user = await User_2.findOne(userId);
      return user;
    }
    throw new Error('User not found');
  }
}
