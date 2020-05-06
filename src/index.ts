import { resfreshTokenHandler } from "./routes/refreshToken";
import { buildSchema } from "type-graphql";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;
// middlewares
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

// rest routes
app.post("/refresh_token", resfreshTokenHandler);

// graphql server
export const startServer = async () => {
  try {
    await createConnection();

    const schema = await buildSchema({
      resolvers: [__dirname + "/modules/**/*.resolver.{ts,js}"],
    });
    const apolloServer = new ApolloServer({
      schema,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
      },
    });
    return app.listen(PORT, () => console.log(`running on: ${PORT}`));
  } catch (error) {
    return console.log("Starting app Error\n", error);
  }
};
