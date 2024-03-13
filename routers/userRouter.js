// IMPORTS --------------------------
import { Router } from "express";
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

// SETUP ROUTER ------------------------------
const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getApplicationStats,
]);
// umpload.single(name), name from form data
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

// EXPORT ---------------------------------------
export default router;
