import { ProductRepository } from "../repositories/productRepository.js";

export const ProductController = {
  create: async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        images,
        categories,
        specification
      } = req.body;

      const missingFields = [];

      verifyFields(title, missingFields, description, price, images, categories, specification);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: 'Missing required fields',
          missingFields
        });
      }

      const ongId = req.user?.id;

      const productData = {
        title,
        description,
        price,
        ongId,
        images,
        specification,
        categories: {
          connect: categories.map((id) => ({ id }))
        }
      };

      const product = await ProductRepository.create(productData);
      return res.status(201).json(product);

    } catch (err) {
      console.error(error)
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  update: async (req, res) => {
    try {
      const productId = req.params.produtoId;
      const data = req.body;

      const product = await ProductRepository.findUnique(productId);

      if (product?.ongId !== req.user.id) {
        return res.status(403).json({ error: 'Acesso negado.' });
      }

      if (!product) {
        return res.status(400).json({ error: 'Produto não encontrado.' });
      }

      data.ongId = req.user.id

      const updated = await ProductRepository.update(productId, data);
      res.json(updated);
    } catch (error) {
      console.error(error)
      res.status(400).json({ Error: "Erro ao tentar atualizar produto: " });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.produtoId;

      const product = await ProductRepository.findUnique(id);

      if (!product || product.ongId !== req.user.id) {
        return res.status(403).json({ error: 'Acesso negado.' });
      }
      
      const deleted = await ProductRepository.delete(id);
      res.json(deleted);
    } catch (error) {
      console.error(error)
      res.status(400).json({ Error: "Erro ao tentar deletar produto" });
    }
  },

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
        orderBy: { createdAt: 'asc' },
      });
      res.json(products);
    } catch (error) {
      console.error(error)
      res.status(500).json({ Error: "Erro interno ao listar produtos." });
    }
  },
};

function verifyFields(title, missingFields, description, price, images, categories, specification) {
  if (!title) missingFields.push('title');
  if (!description) missingFields.push('description');
  if (price === undefined || price === null) missingFields.push('price');
  if (!Array.isArray(images) || images.length === 0) missingFields.push('images');
  if (!Array.isArray(categories) || categories.length === 0) missingFields.push('categories');
  if (!specification) missingFields.push('specification');
}

