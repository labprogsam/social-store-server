import { prisma } from "../database/index.js";

export const OngRepository = {
  // Método que serve tanto para criar quanto para atualizar uma ONG
  upsertOng: (processedData) => {
    return prisma.ONG.upsert({
      where: { id: processedData.id },
      update: processedData,
      create: processedData,
    });
  },

  findAll: () => {
    return prisma.ONG.findMany({ include: { products: true } });
  },

  findById: (id) => {
    return prisma.ONG.findUnique({
      where: { id: parseInt(id) },
      include: { products: true },
    });
  },

  // Método para buscar uma ONG pelo nome
  findByName: (name) => {
    return prisma.ONG.findUnique({
      where: { name },
      include: { products: true },
    });
  },

  delete: (id) => {
    return prisma.ONG.delete({
      where: { id: parseInt(id) },
    });
  },
};
