// Antes de qualquer coisa: o que são controllers?
// Controllers são responsáveis por lidar com as requisições HTTP, processar os dados recebidos e retornar as respostas adequadas.
// Eles atuam como intermediários entre as rotas e os serviços ou repositórios que manipulam a lógica de negócios.
// Neste caso, o ProductController lida com as operações relacionadas aos produtos, como listar, buscar por ID, criar, atualizar e deletar produtos.
// Além disso, eles utilizam os DTOs (Data Transfer Objects) para validar e estruturar os dados recebidos nas requisições.
// Ademais, o ProductController utiliza o ProductRepository para interagir com a base de dados, realizando as operações CRUD (Create, Read, Update, Delete) necessárias.
// Importando o ProductRepository e o DTO necessário:

import { ProductRepository } from "../repositories/productRepository.js";
import { createProductDTO } from "../DTOs/index.js";

export const ProductController = {
  // Método de listagem de produtos
  // Ele busca todos os produtos no repositório e retorna uma lista.
  list: async (req, res) => {
    try {
      const products = await ProductRepository.findAll();
      res.json(products);
    } catch (error) {
      console.error("Erro ao listar produtos: ", error);
      res.status(500).json({ Error: "Erro interno ao listar produtos." });
    }
  },

  // Método para buscar um produto por ID
  // Ele recebe o ID do produto como parâmetro na URL, busca o produto no repositório e retorna os detalhes do produto.
  // Se o produto não for encontrado, retorna um erro 404.
  getById: async (req, res) => {
    const id = req.params.produtoId;

    try {
      const product = await ProductRepository.findById(id);

      if (!product) {
        return res.status(404).json({ Error: "Produto não encontrado." });
      }
      res.json(product);
    } catch (error) {
      console.error("Erro ao tentar buscar produto: ", error);
      res.status(500).json({ Error: "Erro interno ao buscar produto." });
    }
  },

  // Métodos para criar, atualizar e deletar produtos
  // O método create utiliza o DTO para validar os dados recebidos na requisição.
  create: async (req, res) => {
    try {
      const data = createProductDTO(req.body);
      const newProduct = await ProductRepository.create(data);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Erro ao tentar criar produto: ", error);
      res.status(400).json({ Error: error.message });
    }
  },

  // O método update recebe o ID do produto a ser atualizado e os novos dados no corpo da requisição.
  // Ele utiliza o ProductRepository para atualizar o produto e retorna o produto atualizado.
  update: async (req, res) => {
    const id = req.params.produtoId;
    const data = req.body;

    try {
      const updated = await ProductRepository.update(id, data);
      res.json(updated);
    } catch (error) {
      console.error("Erro ao tentar atualizar produto: ", error);
      res.status(400).json({ Error: "Erro ao tentar atualizar produto: " });
    }
  },

  // O método delete recebe o ID do produto a ser deletado e utiliza o ProductRepository para realizar a exclusão.
  // Ele retorna o produto deletado ou um erro caso não seja possível realizar a exclusão
  delete: async (req, res) => {
    const id = req.params.produtoId;
    try {
      const deleted = await ProductRepository.delete(id);
      res.json(deleted);
    } catch (error) {
      console.error("Erro ao tentar deletar produto: ", error);

      res.status(400).json({ Error: "Erro ao tentar deletar produto" });
    }
  },
};
