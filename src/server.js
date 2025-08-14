// Este arquivo é o ponto de entrada do servidor
// Ele importa o app configurado e inicia o servidor na porta 8000

import "dotenv/config";
import app from "./app.js";

const PORT = process.env.SERVER_PORT;
const DB_URL = process.env.DATABASE_URL;

app.listen(PORT, () => {
  console.log(`\x1b[32m✅ Servidor iniciado com sucesso!\x1b[0m`);
  console.log(`🌐 URL: \x1b[34mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`📦 Banco de dados: \x1b[36m${DB_URL}\x1b[0m`);
});
