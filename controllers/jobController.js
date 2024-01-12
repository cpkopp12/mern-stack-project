// IMPORTS --------------------------------
import { nanoid } from 'nanoid';
// job model
import Job from '../models/JobModel.js';

// LOCAL DATA -------------------------------
let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

// EXPORT FUNCTIONS ----------------------------
// get all jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json(jobs);
};

// get job by id
export const getJobById = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(200).json({ job });
};

// create job
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  // try/catch keeps server running if await func fails
  // OR EXPRESS_ASYNC_ErRORS PACKAGE, imported in server.js
  const job = await Job.create({ company, position });
  res.status(201).json({ job });
};

// edit job by id
export const editJobById = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

  // check for wrong job id
  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(200).json({ job: updatedJob });
};

// delete job by id
export const deleteJobById = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  // check bad id
  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(200).json({ job: removedJob });
};
