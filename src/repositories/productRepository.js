// Aqui importamos o PrismaClient do diretório gerado pelo Prisma
import { prisma } from "../database/index.js";

// Exportamos um repositório de produtos que contém métodos para interagir com o banco de dados
// Isso permite que possamos realizar operações CRUD nos produtos
export const ProductRepository = {
  // Métodos para encontrar, criar, atualizar e deletar produtos
  // Cada método utiliza o PrismaClient para realizar operações no banco de dados
  findMany: (params = {}) => {
    return prisma.product.findMany(params);
  },

  findByCategory: (categoryId, skip, take) => {
    return prisma.product.findMany({
      where: {
        categories: {
          some: {
            id: categoryId,
          },
        },
      },
      skip,
      take,
      orderBy: { createdAt: 'asc' },
    });
  },

  findByOng: (ongId, skip, take) => {
    return prisma.product.findMany({
      where: {
        ongId
      },
      skip,
      take,
      orderBy: { createdAt: 'asc' },
    });
  },

  countByCategory: (categoryId) => {
    return prisma.product.count({
      where: {
        categories: {
          some: { id: categoryId },
        },
      },
    })
  },

  countByOng: (ongId) => {
    return prisma.product.count({
      where: {
        ongId
      },
    })
  },

  // Método para encontrar um produto por ID
  // Utiliza o método findUnique do PrismaClient para buscar um produto específico
  findUnique: (id) => {
    return prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
      },
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
      data: {
        ...data,
        categories: {
          set: data.categories.map(id => ({ id }))
        },
      },
      include: {
        categories: true,
      },
    });
  },

  // O método delete recebe um ID e utiliza o método delete do PrismaClient
  delete: (id) => {
    return prisma.product.delete({
      where: { id },
    });
  },
};
