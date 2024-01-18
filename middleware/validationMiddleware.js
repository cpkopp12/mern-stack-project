// IMPORTS ----------------------------------------------------------
import { body, param, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../uitls/constants.js';
import mongoose from 'mongoose';

// Function called in each export ----------------------------------------------
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      // check for errors from express validator
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
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
  param('id')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('invalid MongoDB id'),
]);
