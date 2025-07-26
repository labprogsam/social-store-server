// Este arquivo define as rotas principais da aplicação usando o Express.js.
// Ele importa as rotas de produtos e define uma rota padrão para a aplicação.

import express from "express";
import ongRoutes from "./ongRoutes.js";
import productRoutes from "./productRoutes.js";
import categoriesRoutes from "../routes/categoriesRoutes.js";
import authRoutes from "./authRoutes.js"

const router = express.Router();

// Rotas públicas
router.use("/api/auth", authRoutes);
router.use("/api/categories", categoriesRoutes);
// TODO: criar listagem de produtos por ong (existe no controller de produto)

// Rotas mistas (algumas públicas, outras privadas)
router.use("/api/ong", ongRoutes);
router.use("/api/produtos", productRoutes);

router.get("/", (req, res) => {
  res.json("Bem-vindo à Lojinha Social!");
});

export default router;
