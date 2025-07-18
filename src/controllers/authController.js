import * as dotenv from "dotenv";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";

dotenv.config();

import { OngRepository } from "../repositories/ongRepository.js";
import { processData } from "../utils/process.js";

async function authenticateExternalService(email, password) {

  const response = await fetch(process.env.URL_BORAIMPACTAR_SERVER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Evita erro se o corpo não for JSON
    const errorMessage = errorData.message || 'Credenciais inválidas ou erro no serviço de autenticação.';
    
    throw new Error(errorMessage);
  }

  return response.json();
}

async function saveOngData(ngoData) {
  if (!ngoData) return;
  const processedData = processData(ngoData);
  await OngRepository.upsertOng(processedData);
}

function createSession(res, userData) {
  const tokenPayload = {
    email: userData.user.email,
    ngoId: userData.ngo.id,
    name: userData.user.name,
  };

  const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  res.cookie('token', token, {
    httpOnly: true, // Protege contra ataques XSS
    secure: process.env.NODE_ENV === 'prd',
    sameSite: 'lax',
    path: '/',
  });
}

export const AuthController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Autenticar no serviço externo
      const externalData = await authenticateExternalService(email, password);

      // Salvar dados da ONG localmente (se houver)
      await saveOngData(externalData.ngo);

      // Criar a sessão (JWT + Cookie)
      createSession(res, externalData);

      const clientResponse = {
        user: {
          name: externalData.user?.name,
          email: externalData.user?.email,
        },
        ngo: {
          id: externalData.ngo?.id,
          name: externalData.ngo?.name,
        },
      };

      return res.status(200).json(clientResponse);
    } catch (error) {
      console.error('Falha no login:', error.message);
      return res.status(error.message.includes('Credenciais') ? 401 : 500).json({
        error: error.message || 'Erro interno no servidor.',
      });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prd',
        sameSite: 'lax',
        path: '/',
      });

      return res.status(200).json({ message: 'Logout realizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
};