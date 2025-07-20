// Este arquivo define as rotas relacionadas aos produtos
// Ele importa o Express.js e o ProductController, que contém a lógica de negócios para os produtos.
// As rotas definidas aqui permitem listar, buscar, criar, atualizar e deletar produtos

import express from "express";

import { ProductController } from "../controllers/productController.js";

const router = express.Router();

router.get("/", ProductController.list);
router.post("/", ProductController.create);
router.get("/:produtoId", ProductController.getById);
router.put("/:produtoId", ProductController.update);
router.delete("/:produtoId", ProductController.delete);

export default router;
