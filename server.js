// IMPORTS ---------------------------
// packages
import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// local files
import jobRouter from './routers/jobRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import authRouter from './routers/authRouter.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import userRouter from './routers/userRouter.js';

// APP SETUP ---------------------------------------------------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users/', authenticateUser, userRouter);

// test proxy
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test proxy' });
});

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
