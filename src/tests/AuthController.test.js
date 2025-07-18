import fetch from 'node-fetch';
import jwt from "jsonwebtoken";

import { AuthController } from "../controllers/authController.js";
import { OngRepository } from "../repositories/ongRepository.js";

// Isso substitui as implementações reais por versões simuladas.
jest.mock("../repositories/ongRepository");
jest.mock("../utils/process");
jest.mock("jsonwebtoken");
jest.mock('node-fetch');

describe("AuthController", () => {
  let mockReq;
  let mockRes;

  // Isso garante que os mocks sejam resetados e que cada teste seja independente.
  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };
  });

  describe("login", () => {
    it("deve autenticar, salvar dados, definir cookie e retornar dados do usuário com sucesso", async () => {
      const mockExternalData = {
        user: { name: "Test User", email: "test@example.com" },
        ngo: { id: 10, name: "Test NGO" },
      };
      const mockToken = "fake-jwt-token";

      fetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockExternalData),
      });

      jwt.sign.mockReturnValue(mockToken);

      await AuthController.login(mockReq, mockRes);

      expect(fetch).toHaveBeenCalledWith(
        process.env.URL_BORAIMPACTAR_SERVER,
        expect.any(Object)
      );
      expect(OngRepository.upsertOng).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: "test@example.com", ngoId: 10, name: "Test User" },
        process.env.SECRET_KEY,
        expect.any(Object)
      );
      expect(mockRes.cookie).toHaveBeenCalledWith(
        "token",
        mockToken,
        expect.any(Object)
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        user: { name: "Test User", email: "test@example.com" },
        ngo: { id: 10, name: "Test NGO" },
      });
    });

    it("deve retornar erro 401 para credenciais inválidas", async () => {
      fetch.mockResolvedValue({
        ok: false,
        status: 401,
        json: jest.fn().mockResolvedValue({ message: "Credenciais inválidas" }),
      });

      await AuthController.login(mockReq, mockRes);

      expect(OngRepository.upsertOng).not.toHaveBeenCalled(); // Não deve salvar dados
      expect(mockRes.cookie).not.toHaveBeenCalled(); // Não deve criar cookie
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Credenciais inválidas"),
      });
    });

    it("deve retornar erro 500 se o fetch falhar", async () => {
      const errorMessage = "Network Error";

      fetch.mockImplementation(() => {
        return Promise.reject(new Error(errorMessage));
      });

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("logout", () => {
    it("deve limpar o cookie e retornar uma mensagem de sucesso", async () => {
      await AuthController.logout(mockReq, mockRes);

      expect(mockRes.clearCookie).toHaveBeenCalledWith(
        "token",
        expect.any(Object)
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Logout realizado com sucesso.",
      });
    });
  });
});
