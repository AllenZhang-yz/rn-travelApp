import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import path from 'path';
import http from 'http';
import Redis from 'ioredis';
import { Client } from 'pg';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostgresPubSub } from 'graphql-postgres-subscriptions';
import { PlaceResolver } from './resolvers/PlaceResolver';
import { AuthResolver } from './resolvers/AuthResolver';

const redisStore = connectRedis(session);
const redis = new Redis();

const client = new Client({
  connectionString:
    'postgres://pzdpycvxjdxqhf:2a8a41f331f5f86ff7510ed35f4573313ac82f7c52776cf0db7d32cee2ba58e5@ec2-52-22-94-132.compute-1.amazonaws.com:5432/dlqa9oeq7qdql',
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

async function bootstrap() {
  const app = express();
  app.use(
    session({
      name: 'qid',
      store: new redisStore({
        client: redis,
        disableTouch: true,
      }),
      secret: process.env.SESSION_SECRET || 'sdf34rfsdfsdfv!',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 3,
      },
    })
  );
  const dbOptions = await getConnectionOptions();
  await createConnection(dbOptions);

  const pubSub = new PostgresPubSub({ client });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PlaceResolver, AuthResolver],
      validate: true,
      emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
      pubSub,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
    introspection: true,
    playground: true,
    subscriptions: {
      keepAlive: 1000,
    },
  });
  apolloServer.applyMiddleware({ app, cors: true });
  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);
  const port = process.env.PORT || 4000;
  httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

bootstrap().catch((err) => console.log(err));
