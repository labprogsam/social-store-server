// Este arquivo é o ponto de entrada do servidor
// Ele importa o app configurado e inicia o servidor na porta 3001

import app from "./app.js";

app.listen(3001, () => {
  console.log(
    "Servidor rodando na porta 3001, acesse em http://localhost:3001"
  );
});
