import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controllers/productController.js";
import checkId from "../middlewares/checkId.js";

const router = express.Router();

// Specific route first
router.route("/allproducts").get(fetchAllProducts);
router
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, checkId, addProductReview);
// Generic route
router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
// ID-based route with ObjectId validation
router
  .route("/:id")
  .get(checkId, fetchProductById)
  .put(
    authenticate,
    authorizeAdmin,
    formidable(),
    checkId,
    updateProductDetails
  )
  .delete(authenticate, authorizeAdmin, checkId, removeProduct);

export default router;
