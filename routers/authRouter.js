// IMPORTS ---------------
import { Router } from 'express';
import { register, login, logout } from '../controllers/authController.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';

// SET UP ROUTER -----------------------
const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

// EXPORT ROUTER ---------------------------
export default router;
