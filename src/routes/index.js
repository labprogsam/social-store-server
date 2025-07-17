// Este arquivo define as rotas principais da aplicação usando o Express.js.
// Ele importa as rotas de produtos e define uma rota padrão para a aplicação.

import express from "express";
import productRoutes from "./productRoutes.js";

const router = express.Router();

router.use("/produtos", productRoutes);

// Rota padrão que retorna uma mensagem de boas-vindas
// Esta rota é acessível na raiz da aplicação
router.get("/", (req, res) => {
  res.json("Bem-vindo à Lojinha Social!");
});

export default router;
