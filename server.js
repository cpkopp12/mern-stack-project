// IMPORTS ---------------------------
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import { nanoid } from 'nanoid';

// LOCAL DATA -------------------------------
let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

// APP SETUP ---------------------------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/', (req, res) => {
  res.json({ message: 'dataReceived', data: req.body });
});

// GET ALL JOBS : /api/v1/jobs
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json(jobs);
});

// FIND ONE JOB BY ID: /api/v1/jobs/:id
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(200).json({ job });
});

// CREATE JOB : /api/v1/jobs
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).json({ msg: 'Please provide company and position' });
  }

  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);

  res.status(201).json({ job });
});

// EDIT JOB: /api/v1/jobs/:id
app.patch('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;

  // check for missing in body
  if (!company || !position) {
    return res.status(400).json({ msg: 'Please provide company and position' });
  }

  const job = jobs.find((job) => job.id === id);
  // check for wrong job id
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified', job });
});

// DELETE JOB BY ID: /api/v1/jobs/:id
app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: 'job deleted' });
});

// SET PORT AND LISTEN -----------------------
const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on Port ${port}`);
});
