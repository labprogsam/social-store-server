// Este arquivo é o ponto de entrada da aplicação
// Ele importa o Express.js e as rotas definidas no arquivo de rotas principal

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

app.use(routes);

export default app;
