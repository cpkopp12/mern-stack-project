// IMPORTS --------------------------
import { StatusCodes } from "http-status-codes";
// local imports
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

// CONTROLLER FUNCTIONS ------------------------------------------
export const getCurrentUser = async (req, res) => {
  let user = await User.findOne({ _id: req.user.userId });
  user = user.toJSON();
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  // dont return password
  const obj = { ...req.body };
  delete obj.password;

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "user updated", obj });
};
