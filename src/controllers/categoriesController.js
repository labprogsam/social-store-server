import { CategoryRepository } from "../repositories/categoriesRepository.js";
import { ProductRepository } from "../repositories/productRepository.js";

export const CategoriesController = {

	listProducts: async (req, res) => {
		try {
			const categoryId = parseInt(req.params.categoryId);
			const skip = parseInt(req.query.skip) || 0;
			const take = parseInt(req.query.take) || 4;

			const category = await CategoryRepository.findUnique(categoryId);

			if (!category) {
				return res.status(404).json({ Error: 'Categoria não encontrada.' })
			}

			const products = await ProductRepository.findByCategory(categoryId, skip, take);

			const total = await ProductRepository.countByCategory(categoryId);

			return res.json({
				data: products,
				meta: {
					total,
					skip,
					take,
					hasNextPage: skip + take < total,
				},
			});

		} catch (error) {
			res.status(500).json({ Error: "Erro interno ao listar produtos da categoria." });
		}
	}
};
