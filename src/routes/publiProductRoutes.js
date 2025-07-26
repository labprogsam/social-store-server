import express from "express";

import { PubliProductController } from "../controllers/publiProductController.js";

const router = express.Router();

router.get("/", PubliProductController.list);
router.get("/highlights", PubliProductController.highlights);
router.get("/:produtoId", PubliProductController.getById);

export default router;
