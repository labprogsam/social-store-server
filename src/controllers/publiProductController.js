import { OngRepository } from "../repositories/ongRepository.js";
import { ProductRepository } from "../repositories/productRepository.js";

export const PubliProductController = {
  list: async (req, res) => {
    try {
      const products = await ProductRepository.findMany();
      res.json(products);
    } catch (error) {
      console.error(error)
      res.status(500).json({ Error: "Erro interno ao listar produtos." });
    }
  },

  listByOng: async (req, res) => {
    try {
      const ongId = parseInt(req.params.ongId);
      const skip = parseInt(req.query.skip) || 0;
      const take = parseInt(req.query.take) || 4;

      const ong = await OngRepository.findUnique(ongId);

      if (!ong) {
        return res.status(404).json({ Error: 'Ong não encontrada.' })
      }

      const products = await ProductRepository.findByOng(ongId, skip, take);

      const total = await ProductRepository.countByOng(ongId);

      return res.json({
        data: products,
        meta: {
          total,
          skip,
          take,
          hasNextPage: skip + take < total,
        },
      });
    } catch (error) {
      console.error(error)
      res.status(500).json({ Error: "Erro interno ao listar produtos da ong." });
    }
  },

  getById: async (req, res) => {
    const id = req.params.produtoId;

    try {
      const product = await ProductRepository.findUnique(id);

      if (!product) {
        return res.status(400).json({ Error: "Produto não encontrado." });
      }
      res.json(product);
    } catch (error) {
      console.error(error)
      res.status(500).json({ Error: "Erro interno ao buscar produto." });
    }
  },

  highlights: async (req, res) => {
    try {
      const products = await ProductRepository.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
      });
      res.json(products);
    } catch (error) {
      console.error(error)
      res.status(500).json({ Error: "Erro interno ao listar produtos." });
    }
  },
};
