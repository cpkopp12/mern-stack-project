// IMPORTS ---------------
import { Router } from 'express';
import { register, login } from '../controllers/authController.js';

// SET UP ROUTER -----------------------
const router = Router();

router.post('/register', register);
router.post('/login', login);

// EXPORT ROUTER ---------------------------
export default router;
