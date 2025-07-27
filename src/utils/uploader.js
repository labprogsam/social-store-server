import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

export const Uploader = async (file, width=500) => {
	const uploadOptions = {
		format: "webp",
		quality: "auto:low",
		transformation: [
			{ width: width, height: 500, crop: "limit" },
		],
		resource_type: "auto",
	};

	// Fazendo o upload para o Cloudinary
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			uploadOptions,
			(error, result) => {
				if (result) resolve(result);
				else reject(error);
			}
		);
		streamifier.createReadStream(file).pipe(stream);
	});
}

export const DeleteImage = async (url) => {
	try {
		const parts = url.split('/');
		const fileName = parts.pop(); // "photo_xyz.webg"
		const publicId = fileName?.replace(/\.[^.]+$/, ''); // remove extensão

		const result = await cloudinary.uploader.destroy(publicId);
		if (result.result !== "ok") {
			console.error("Erro ao excluir imagem:", result);
			return null;
		}
		return result;
	} catch (error) {
		console.error("Erro inesperado ao deletar imagem:", error);
		return null;
	}
};
