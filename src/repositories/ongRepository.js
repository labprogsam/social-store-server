import { prisma } from "../database/index.js";

export const OngRepository = {
  upsertOng: (processedData) => {
    return prisma.ONG.upsert({
        where: { id: processedData.id },
        update: processedData,
        create: processedData,
      });
  },
};
