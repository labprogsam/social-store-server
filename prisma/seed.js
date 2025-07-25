import { prisma } from "../src/database/index.js";

async function main() {
  const categories = [
    { value: 'Artesanato e Produtos' },
    { value: 'Alimentos e Bebidas' },
    { value: 'Roupas e Acessórios' },
    { value: 'Arte e Cultura' },
    { value: 'Produtos Sustentáveis' },
    { value: 'Produtos de Higiene e Cosméticos Naturais' },
    { value: 'Itens de Decoração' },
    { value: 'Outros' },
  ];

  for (const category of categories) {
    await prisma.categories.upsert({
      where: { value: category.value },
      update: {},
      create: category,
    });
  }

  console.log('Seed concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao rodar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
