// import { UserResolver } from "./modules/user/user.resolver";
import { buildSchema } from "type-graphql";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";

const app = express();
const PORT = process.env.PORT || 4000;

export const startServer = async () => {
  try {
    await createConnection();

    const schema = await buildSchema({
      resolvers: [__dirname + "/modules/**/*.resolver.{ts,js}"],
    });
    const apolloServer = new ApolloServer({
      schema,
      playground: true,
    });

    const cors = {
      credentials: true,
      origin: process.env.NODE_ENV === 'test' ? '*' : process.env.FRONTEND_HOST,
    };

    apolloServer.applyMiddleware({ app, cors });
    return app.listen(PORT, () => console.log(`running on: ${PORT}`));
  } catch (error) {
    return console.log(">>>>>>>>\n", error);
  }
};