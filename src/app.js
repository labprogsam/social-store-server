// Este arquivo é o ponto de entrada da aplicação
// Ele importa o Express.js e as rotas definidas no arquivo de rotas principal

import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(routes);

export default app;
