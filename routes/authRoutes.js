import { Router } from "express";
import authControllers from "../controllers/authControllers.js";

const router = Router();

router.post("/login", authControllers.login_post);
router.post("/signup", authControllers.signup_post);

export default router;
