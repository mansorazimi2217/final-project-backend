import { Router } from "express";
import returnDueController from "../controllers/returnDueController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get("/", returnDueController.getAll);
router.post("/", returnDueController.postNew);
router.delete("/:id", returnDueController.deleteOne);

export default router;
