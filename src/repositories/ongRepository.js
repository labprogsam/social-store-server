import { prisma } from "../database/index.js";

export const OngRepository = {
  // Método que serve tanto para criar quanto para atualizar uma ONG
  upsertOng: (processedData) => {
    return prisma.ONG.upsert({
      where: { external_id: processedData.external_id },
      update: processedData,
      create: processedData,
    });
  },

  findAll: () => {
    return prisma.ONG.findMany();
  },

  findById: (id) => {
    return prisma.ONG.findUnique({
      where: { id: parseInt(id) },
      include: { products: true },
    });
  },

  findUnique: (id) => {
    return prisma.ONG.findUnique({
      where: { id },
    });
  },

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
