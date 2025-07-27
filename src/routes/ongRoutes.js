import express from "express";
import multer from "multer";
import { OngController } from "../controllers/ongController.js";
import { verifyToken } from "../utils/verifyToken.js";
import { ProductController } from "../controllers/productController.js";

// Configuração do Multer para armazenar em memória
// const storage = multer.memoryStorage();
const upload = multer();

const router = express.Router();

// Rotas públicas
router.get("/", OngController.listOrSearch);
router.get("/:ongId/products", ProductController.listByOng);
router.get("/:ongId", OngController.getById);

// Rotas privadas
router.put("/logo", verifyToken, upload.single("image"), OngController.uploadLogo);
router.put("/banner", verifyToken, upload.single("image"), OngController.uploadBanner);
router.put("/whatsapp", verifyToken, upload.single("image"), OngController.updateWhatsapp);
router.put("/", verifyToken, OngController.update);
router.delete("/:ongId", verifyToken, OngController.delete);

export default router;
