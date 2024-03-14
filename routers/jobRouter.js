// IMPORTS -----------------------------------
import { Router } from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  editJobById,
  deleteJobById,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// SETUP ROUTER ------------------------------
const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getJobById)
  .patch(checkForTestUser, validateJobInput, validateIdParam, editJobById)
  .delete(checkForTestUser, validateIdParam, deleteJobById);

export default router;
