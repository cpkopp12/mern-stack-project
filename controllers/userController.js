// IMPORTS --------------------------
import { StatusCodes } from 'http-status-codes';
// local imports
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

// CONTROLLER FUNCTIONS ------------------------------------------
export const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'get current user' });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'get app stats' });
};

export const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'update current user' });
};
