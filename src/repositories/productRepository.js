import { prisma } from "../database/index.js";

export const ProductRepository = {

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

  findUnique: (id) => {
    return prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });
  },

  create: (data) => {
    return prisma.product.create({ data });
  },

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

  delete: (id) => {
    return prisma.product.delete({
      where: { id },
    });
  },
};
