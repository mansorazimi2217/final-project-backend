import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import { upload } from "../middleware/upload.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.post("/login", authControllers.login_post);
router.post("/signup", authControllers.signup_post);

router.patch(
  "/update-profile-image",
  requireAuth,
  upload.single("profileImage"),
  authControllers.update_profile_image
);

export default router;
