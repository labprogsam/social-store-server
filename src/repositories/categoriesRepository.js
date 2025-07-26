import { prisma } from "../database/index.js";

export const CategoryRepository = {
  findMany: (params = {}) => {
    return prisma.categories.findMany(params);
  },

  findUnique: (id) => {
    return prisma.categories.findUnique({
      where: { id },
    });
  },

  create: (data) => {
    return prisma.categories.create({ data });
  },

  update: (id, data) => {
    return prisma.categories.update({
      where: { id },
      data,
    });
  },

  delete: (id) => {
    return prisma.categories.delete({
      where: { id },
    });
  },
};
