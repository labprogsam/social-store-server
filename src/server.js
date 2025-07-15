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


app.post("/publicarProduto", (req, res) => {
    const data = req.body

    console.log(data)
    res.json(data)
})


app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001, acesse em http://localhost:3001");
});
