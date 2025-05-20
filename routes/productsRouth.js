import { Router } from "express";
import productsController from "../controllers/productsController.js";
import { upload } from "../middleware/upload.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

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
