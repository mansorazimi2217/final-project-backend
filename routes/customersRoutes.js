import { Router } from "express";
import customersController from "../controllers/customersController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);
router.get("/", customersController.getAllCustomers);
router.get("/:id", customersController.getOneCustomer);
router.post("/", customersController.addNewCustomer);
router.delete("/:id", customersController.deleteCustomer);
router.patch("/:id", customersController.updateCustomer);

export default router;
