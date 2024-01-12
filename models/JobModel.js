// IMPORTS ------------------------------------------------
import mongoose from 'mongoose';

// SET UP SCHEMA --------------------------------------------
const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
  },
  { timestamps: true }
);

// EXPORT MODEL, model(nameCollection, schema) -------------
export default mongoose.model('Job', JobSchema);
