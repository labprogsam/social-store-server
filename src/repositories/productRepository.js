// Aqui importamos o PrismaClient do diretório gerado pelo Prisma
import { prisma } from "../database/index.js";

// Exportamos um repositório de produtos que contém métodos para interagir com o banco de dados
// Isso permite que possamos realizar operações CRUD nos produtos
export const ProductRepository = {
  // Métodos para encontrar, criar, atualizar e deletar produtos
  // Cada método utiliza o PrismaClient para realizar operações no banco de dados
  findAll: () => {
    return prisma.product.findMany();
  },

  // Método para encontrar um produto por ID
  // Utiliza o método findUnique do PrismaClient para buscar um produto específico
  findById: (id) => {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  // Método para criar um novo produto
  // Recebe um objeto de dados do produto e utiliza o método create do PrismaClient
  create: (data) => {
    return prisma.product.create({ data });
  },

  // Métodos para atualizar e deletar produtos
  // O método recebe um ID e os dados a serem atualizados
  update: (id, data) => {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  // O método delete recebe um ID e utiliza o método delete do PrismaClient
  delete: (id) => {
    return prisma.product.delete({
      where: { id },
    });
  },
};
