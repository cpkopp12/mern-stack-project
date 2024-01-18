// IMPORTS -----------------------------------
import { Router } from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  editJobById,
  deleteJobById,
} from '../controllers/jobController.js';
import { validateJobInput } from '../middleware/validationMiddleware.js';

// SETUP ROUTER ------------------------------
const router = Router();

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(getJobById)
  .patch(validateJobInput, editJobById)
  .delete(deleteJobById);

export default router;
