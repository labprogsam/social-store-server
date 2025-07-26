import express from "express";

import { ProductController } from "../controllers/productController.js";
import {verifyToken} from "../utils/verifyToken.js";

const router = express.Router();

// Private Routes
router.post("/", verifyToken, ProductController.create);
router.put("/:produtoId", verifyToken, ProductController.update);
router.delete("/:produtoId", verifyToken, ProductController.delete);

// Public Routes
router.get("/", ProductController.list);
router.get("/highlights", ProductController.highlights);
router.get("/:produtoId", ProductController.getById);


export default router;
