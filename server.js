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
// APP SETUP ---------------------------------------------------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

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
