// Antes de qualquer coisa: o que são controllers?
// Controllers são responsáveis por lidar com as requisições HTTP, processar os dados recebidos e retornar as respostas adequadas.
// Eles atuam como intermediários entre as rotas e os serviços ou repositórios que manipulam a lógica de negócios.
// Neste caso, o ProductController lida com as operações relacionadas aos produtos, como listar, buscar por ID, criar, atualizar e deletar produtos.
// Além disso, eles utilizam os DTOs (Data Transfer Objects) para validar e estruturar os dados recebidos nas requisições.
// Ademais, o ProductController utiliza o ProductRepository para interagir com a base de dados, realizando as operações CRUD (Create, Read, Update, Delete) necessárias.
// Importando o ProductRepository e o DTO necessário:

import { ProductRepository } from "../repositories/productRepository.js";

export const PrivProductController = {
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

  // O método update recebe o ID do produto a ser atualizado e os novos dados no corpo da requisição.
  // Ele utiliza o ProductRepository para atualizar o produto e retorna o produto atualizado.
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

  // O método delete recebe o ID do produto a ser deletado e utiliza o ProductRepository para realizar a exclusão.
  // Ele retorna o produto deletado ou um erro caso não seja possível realizar a exclusão
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
};

function verifyFields(title, missingFields, description, price, images, categories, specification) {
  if (!title) missingFields.push('title');
  if (!description) missingFields.push('description');
  if (price === undefined || price === null) missingFields.push('price');
  if (!Array.isArray(images) || images.length === 0) missingFields.push('images');
  if (!Array.isArray(categories) || categories.length === 0) missingFields.push('categories');
  if (!specification) missingFields.push('specification');
}

