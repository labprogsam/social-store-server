// .env
// npx prisma
// npx prisma studio

import app from "./app.js";
import { prisma } from "./database/index.js";

app.get("/", (req, res) => {
    res.json("Bem-vindo à Lojinha Social!");
})


app.get("/produto", async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.log(error);
    }
})


app.get("/:produtoId", async (req, res) => {
    const produtoId = req.params.produtoId

    const produto = await prisma.product.findFirst({
        where: { id: produtoId }
    })
    res.json(produto);
})


app.post("/publicarProduto", async (req, res) => {
    const dadosCorpo = req.body

    const novoProduto = await prisma.product.create({
        data: dadosCorpo
    })

    res.json(novoProduto)
})


app.put("/:produtoId", async (req, res) => {
    const produtoId = req.params.produtoId
    const dadosCorpo = req.body // Depois adicionar validações com return e destruturar (melhor)

    const produtoEditado = await prisma.product.update({
        where: { id: produtoId },
        data: dadosCorpo
    })

    res.json(produtoEditado)
})


app.delete("/:produtoId", async (req, res) => {
    const productId = req.params.produtoId
    const produtoDeletetado = await prisma.product.delete({
        where: { id: productId }
    })
    res.json(produtoDeletetado)
})

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001, acesse em http://localhost:3001");
});
