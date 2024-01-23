// IMPORTS --------------------------
import { Router } from 'express';
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js';

// SETUP ROUTER ------------------------------
const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', getApplicationStats);
router.patch('/update-user', updateUser);

// EXPORT ---------------------------------------
export default router;
