// IMPORTS -----------------------------------
import { Router } from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  editJobById,
  deleteJobById,
} from '../controllers/jobController.js';
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';

// SETUP ROUTER ------------------------------
const router = Router();

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(validateIdParam, getJobById)
  .patch(validateJobInput, validateIdParam, editJobById)
  .delete(validateIdParam, deleteJobById);

export default router;
