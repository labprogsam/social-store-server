// Aqui, importamos o PrismaClient do diretório gerado pelo Prisma
import { PrismaClient } from "../generated/prisma/index.js";

// Exportamos uma instância do PrismaClient para ser usada em outros arquivos
// Isso permite que possamos interagir com o banco de dados usando o Prisma
export const prisma = new PrismaClient();
