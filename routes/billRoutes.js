import express from "express";
import billControllres from "../controllers/billControllres.js";

const router = express.Router();

router.get("/", billControllres.getAllData);
router.get("/:id", billControllres.getSingleData);
router.post("/", billControllres.postNewData);
router.patch("/:id", billControllres.updateData);
router.delete("/:id", billControllres.deleteData);

export default router;
