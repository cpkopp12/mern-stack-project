// IMPORTS --------------------------
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
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
  const newUser = { ...req.body };
  delete newUser.password;

  // cloudinary
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
