import express from "express";

import { CategoriesController } from "../controllers/categoriesController.js";

const router = express.Router();

router.get("/:categoryId/products", CategoriesController.listProducts);

export default router;
