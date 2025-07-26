import { OngRepository } from "../repositories/ongRepository.js";

export const OngController = {
  // Método que serve tanto para criar quanto para atualizar uma ONG
  save: async (req, res) => {
    try {
      const ong = await OngRepository.upsertOng(req.body);
      res.status(200).json(ong);
    } catch (error) {
      console.error("Erro ao tentar salvar ONG: ", error);
      res.status(400).json({ Error: "Erro ao tentar salvar ONG: ", error });
    }
  },

  // Método que serve para listar ONGs ou buscar por query parameters
  listOrSearch: async (req, res) => {
    try {
      const { name, id } = req.query;

      // Se tem parâmetro "name", busca pelo nome
      if (name) {
        const ong = await OngRepository.findByName(name);
        if (!ong) {
          return res.status(404).json({ Error: "ONG não encontrada." });
        }
        return res.status(200).json(ong);
      }

      // Se tem parâmetro "id", busca pelo ID
      if (id) {
        const ong = await OngRepository.findById(id);
        if (!ong) {
          return res.status(404).json({ Erro: "ONG não encontrada." });
        }
        return res.status(200).json(ong);
      }

      // Se não tem parâmetros, lista todas
      const ongs = await OngRepository.findAll();
      res.status(200).json(ongs);
    } catch (error) {
      console.error("Erro ao processar requisição: ", error);
      res.status(500).json({ Error: "Erro interno: ", error });
    }
  },

  // Método que serve para buscar uma ONG pelo ID (rota específica)
  getById: async (req, res) => {
    const id = req.params.ongId;
    try {
      const ong = await OngRepository.findById(id);
      if (!ong) {
        return res.status(404).json({ Erro: "ONG não encontrada." });
      }
      res.json(ong);
    } catch (error) {
      console.error("Erro ao buscar ONG: ", error);
      res.status(500).json({ Error: "Erro interno ao buscar ONG: ", error });
    }
  },

  // Método que serve para deletar uma ONG pelo ID
  delete: async (req, res) => {
    const id = req.params.ongId;
    try {
      const ong = await OngRepository.delete(id);
      if (!ong) {
        return res.status(404).json({ Erro: "ONG não encontrada." });
      }
      res
        .status(200)
        .json({ "A seguinte ONG foi deletada com sucesso: ": ong });
    } catch (error) {
      console.error("Erro ao tentar deletar ONG: ", error);
      res.status(404).json({ Error: "Erro ao tentar deletar ONG." });
    }
  },
};
