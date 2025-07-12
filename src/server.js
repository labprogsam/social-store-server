import app from "./app.js";
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Servidor rodando com sucesso!")
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`)
})
