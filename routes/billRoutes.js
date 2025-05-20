import express from "express";
import billControllres from "../controllers/billControllres.js";
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.use(requireAuth);
router.get("/", billControllres.getAllData);
router.get("/:id", billControllres.getSingleData);
router.post("/", billControllres.postNewData);
router.patch("/:id", billControllres.updateData);
router.delete("/:id", billControllres.deleteData);

export default router;
