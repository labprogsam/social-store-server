// Este arquivo é o ponto de entrada do servidor
// Ele importa o app configurado e inicia o servidor na porta 3001

import app from "./app.js";

app.listen(8000, () => {
  console.log(
    "Servidor rodando na porta 8000, acesse em http://localhost:8000"
  );
});
