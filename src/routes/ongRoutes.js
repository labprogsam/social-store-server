import express from "express";
import { OngController } from "../controllers/ongController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Rotas públicas
router.get("/", OngController.listOrSearch);
router.get("/:ongId", OngController.getById);

// Rotas privadas
router.post("/", verifyToken, OngController.save);
router.put("/:ongId", verifyToken, OngController.save);
router.delete("/:ongId", verifyToken, OngController.delete);

export default router;
