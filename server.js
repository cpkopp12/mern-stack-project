// IMPORTS ---------------------------
// packages
import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

// local files
import jobRouter from './routers/jobRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { validateTest } from './middleware/validationMiddleware.js';

// APP SETUP ---------------------------------------------------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// TEST ROUTES
// app.get('/', (req, res) => {
//   res.send('hello world');
// });

app.post('/api/v1/test', validateTest, (req, res) => {
  const { name } = req.body;
  res.json({ message: `hello ${name}` });
});

app.use('/api/v1/jobs', jobRouter);

// 404 catch all
app.use('*', (req, res) => {
  res.status(404).json({ mgs: 'not found' });
});

app.use(errorHandlerMiddleware);

// SET PORT AND LISTEN ----------------------------------------------
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on Port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
