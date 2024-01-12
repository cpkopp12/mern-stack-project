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

// APP SETUP ---------------------------------------------------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// TEST ROUTES
// app.get('/', (req, res) => {
//   res.send('hello world');
// });

// app.post('/', (req, res) => {
//   res.json({ message: 'dataReceived', data: req.body });
// });

app.use('/api/v1/jobs', jobRouter);

// 404 catch all
app.use('*', (req, res) => {
  res.status(404).json({ mgs: 'not found' });
});

// error middle ware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

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
