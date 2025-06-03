import { Router } from "express";
import ExpensesController from "../controllers/ExpensesController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get("/", ExpensesController.getAll);
router.post("/", ExpensesController.addNew);
router.patch("/:id", ExpensesController.updateExpense);
router.delete("/:id", ExpensesController.deleteExpense);

export default router;
