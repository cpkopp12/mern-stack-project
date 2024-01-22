// IMPORTS --------------------------------
import { StatusCodes } from 'http-status-codes';
// job model
import Job from '../models/JobModel.js';

// EXPORT FUNCTIONS ----------------------------
// get all jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json(jobs);
};

// get job by id
export const getJobById = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json({ job });
};

// create job
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// edit job by id
export const editJobById = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

// delete job by id
export const deleteJobById = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ job: removedJob });
};
