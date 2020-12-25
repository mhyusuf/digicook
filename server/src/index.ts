import path from 'path';
import express, { Request, Response } from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import authRouter from './routes/authRouter';
import collectionRouter from './routes/collectionRouter';
import recipeRouter from './routes/recipeRouter';
import connectDB from './models';
const { cookieKey } = require('./config/keys');
require('./services/passport');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter);
app.use('/api/collections', collectionRouter);
app.use('/api/recipes', recipeRouter);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { user: req.user };
  },
});
server.applyMiddleware({ app });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, '../../client', 'build', 'index.html'),
    );
  });
}

connectDB().then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
    console.log(
      `Apollo server ready at http://localhost:${PORT}${server.graphqlPath}`,
    );
  });
});
