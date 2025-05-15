import { Router } from "express";
import productsController from "../controllers/productsController.js";
import { upload } from "../middleware/upload.js";
const router = Router();

router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getSingleProduct);

router.post(
  "/",
  upload.single("productImage"),
  productsController.addNewProduct
);

router.delete("/:id", productsController.deleteProduct);

router.patch(
  "/:id",
  upload.single("productImage"),
  productsController.updateProduct
);

export default router;
