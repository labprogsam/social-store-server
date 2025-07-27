import { OngRepository } from "../repositories/ongRepository.js";
import { Uploader, DeleteImage } from "../utils/uploader.js";

export const OngController = {
  update: async (req, res) => {
    try {
      const {
        name,
        description
      } = req.body;

      const ongId = req.user?.id;
      const ongInfos = await OngRepository.findUnique(ongId);

      const updatedInfos = {
        ...ongInfos,
        name,
        description
      }

      const ong = await OngRepository.upsertOng(updatedInfos);
      res.status(200).json(ong);
    } catch (error) {
      console.error("Erro ao tentar salvar ONG: ", error);
      res.status(400).json({ Error: "Erro ao tentar salvar ONG: ", error });
    }
  },

  updateWhatsapp: async (req, res) => {
    try {
      const {
        whatsapp
      } = req.body;

      const ongId = req.user?.id;
      const ongInfos = await OngRepository.findUnique(ongId);

      const updatedInfos = {
        ...ongInfos,
        whatsapp
      }

      const ong = await OngRepository.upsertOng(updatedInfos);
      res.status(200).json(ong);
    } catch (error) {
      console.error("Erro ao tentar salvar ONG: ", error);
      res.status(400).json({ Error: "Erro ao tentar salvar ONG: ", error });
    }
  },

  uploadLogo: async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ Error: 'Arquivo não enviado.' });
    }

    try {
      const uploadResult = await Uploader(file.buffer);

      const ongId = req.user?.id;
      const ongInfos = await OngRepository.findUnique(ongId);

      if (ongInfos?.logo) {
        await DeleteImage(ongInfos?.logo)
      }

      const updatedInfos = {
        ...ongInfos,
        logo: uploadResult.secure_url,
      }

      await OngRepository.upsertOng(updatedInfos);

      res.status(200).json({
          message: "Upload bem-sucedido!",
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        });

    } catch (error) {
      console.error("Erro ao buscar ONG: ", error);
      res.status(500).json({ Error: "Erro interno ao atualizar logo da ONG: ", error });
    } 
  },

  uploadBanner: async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ Error: 'Arquivo não enviado.' });
    }

    try {
      const uploadResult = await Uploader(file.buffer, 1400);

      const ongId = req.user?.id;
      const ongInfos = await OngRepository.findUnique(ongId);

      if (ongInfos?.banner) {
        await DeleteImage(ongInfos?.banner)
      }

      const updatedInfos = {
        ...ongInfos,
        banner: uploadResult.secure_url,
      }

      await OngRepository.upsertOng(updatedInfos);

      res.status(200).json({
          message: "Upload bem-sucedido!",
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        });

    } catch (error) {
      console.error("Erro ao buscar ONG: ", error);
      res.status(500).json({ Error: "Erro interno ao atualizar banner da ONG: ", error });
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
