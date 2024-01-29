// IMPORTS ----------------------------------------------------------
import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  Unauthorized,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../uitls/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

// Function called in each export ----------------------------------------------
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      // check for errors from express validator
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new Unauthorized('not authorized to acces route');
        }
        throw new BadRequestError(errorMessages);
      }
      // call next
      next();
    },
  ];
};

// validation for job model -----------------------------------------------
export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('job location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid job status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('invalid job type value'),
]);

// validation for id params (param name has to match route in router) ----------
export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new BadRequestError('invalid MongoDB id');
    }
    const job = await Job.findById(value);

    if (!job) {
      throw new NotFoundError(`no job with id ${id}`);
    }
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new Unauthorized('not authorized to acces route');
    }
  }),
]);

// validate register input ---------------------------------
export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('not a valid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be atleast 8 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);

// validate login input ------------------------------------
export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

// update user input --------------------
export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('valid email format required')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);
