import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import expensesRouter from './src/routes/expenses.router.ts';
import usersRouter from './src/routes/users.router.ts';
import categoriesRouter from './src/routes/categories.router.ts';
import authRouter from './src/routes/auth.router.ts';
import { yoga } from './src/graphql/yoga.ts';

const app = express();

const port = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', /\.onrender\.com$/] }));
app.use(yoga.graphqlEndpoint, yoga);

app.get('/ping', (req, res) => {
  res.sendStatus(204);
});

app.use('/api/expenses', expensesRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/auth', authRouter)

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

export default app;