// Este arquivo contém a definição do DTO para criar um produto
// O DTO (Data Transfer Object) é usado para transferir dados entre processos

export function createProductDTO(body) {
  const { title, description, price } = body;

  if (!title || !description || !price) {
    throw new Error(
      "Todos os campos são obrigatórios: nome do produto, descrição e preço."
    );
  }

  if (price < 0 || isNaN(Number(price))) {
    throw new Error("O preço deve ser um número válido e positivo.");
  }

  return {
    title: title.trim(),
    description: description.trim() || "",
    price: Number(price),
  };
}
