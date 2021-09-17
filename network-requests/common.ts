import axios from "axios";

export const handleImageUpload = (image: File): Promise<string> => {
	return new Promise(async (res, rej) => {
		try {
			const formData = new FormData();
			formData.append("upload", image);
			const { data } = await axios.post(`/image-upload`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			res(data);
		} catch (error) {
			rej(error);
		}
	});
};
