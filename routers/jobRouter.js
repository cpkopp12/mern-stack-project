// IMPORTS -----------------------------------
import { Router } from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  editJobById,
  deleteJobById,
} from '../controllers/jobController.js';

// SETUP ROUTER ------------------------------
const router = Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJobById).patch(editJobById).delete(deleteJobById);

export default router;
