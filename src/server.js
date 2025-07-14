import app from "./app.js";

app.get("/", (req, res) => {
    res.json("Bem-vindo à Lojinha Social!");
})

app.get("/produto", (req, res) => {
    res.json("Boneca de pano.");
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001, acesse em http://localhost:3001/produto");
});
