import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

import models from './models';
import schema from './schema/index';
import resolvers from './resolvers/index';

const app = express();
app.use(cors());
app.use(morgan('dev'));

const loggedInUser = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET_KEY);
    } catch (e) {
      throw new AuthenticationError('Sign in again.');
    }
  }
};

const port = process.env.PORT || 3800;

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection }) => {
    const me = await loggedInUser(req);
    return {
      models,
      me,
      secret: process.env.SECRET_KEY
    };
  }
});

server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
export default app;
