// Este arquivo define as rotas principais da aplicação usando o Express.js.
// Ele importa as rotas de produtos e define uma rota padrão para a aplicação.

import express from "express";
import publiProductRoutes from "../routes/publiProductRoutes.js";
import privProductRoutes from "../routes/privProductRoutes.js";
import categoriesRoutes from "../routes/categoriesRoutes.js";
import authRoutes from "./authRoutes.js"
import {verifyToken} from "../utils/verifyToken.js";

const router = express.Router();

// Rotas privadas
router.use("/api/ong/produtos", verifyToken, privProductRoutes);

// Rotas públicas
router.use("/api/auth", authRoutes);
router.use("/api/produtos", publiProductRoutes);
router.use("/api/categories", categoriesRoutes);
// TODO: criar listagem de produtos por ong (existe no controller de produto)

router.get("/", (req, res) => {
  res.json("Bem-vindo à Lojinha Social!");
});

export default router;
