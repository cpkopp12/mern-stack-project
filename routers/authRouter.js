// IMPORTS ---------------
import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';

// SET UP ROUTER -----------------------
const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

// EXPORT ROUTER ---------------------------
export default router;
