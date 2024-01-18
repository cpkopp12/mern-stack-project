// IMPORTS ---------------
import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';

// SET UP ROUTER -----------------------
const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', login);

// EXPORT ROUTER ---------------------------
export default router;
