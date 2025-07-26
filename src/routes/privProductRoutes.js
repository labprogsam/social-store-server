import express from "express";

import { PrivProductController } from "../controllers/privProductController.js";

const router = express.Router();

router.post("/", PrivProductController.create);
router.put("/:produtoId", PrivProductController.update);
router.delete("/:produtoId", PrivProductController.delete);

export default router;
