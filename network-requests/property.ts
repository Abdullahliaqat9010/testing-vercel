import axios from "axios";

export const createProperty = (property): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			const { data } = await axios.post("property", {
				...property,
			});
			res(data);
		} catch (error) {
			rej(error);
		}
	});
};

export const getProperty = (id?: number | null): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		try {
			const { data: property } = await axios.get("property", {
				params: { id },
			});
			resolve(property);
		} catch (error) {
			reject(error);
		}
	});
};

export const getProperties = (userId): Promise<any[]> => {
	return new Promise(async (res, rej) => {
		try {
			const { data: properties } = await axios.get(`users/${userId}/property`);
			res(properties);
		} catch (error) {
			rej(error);
		}
	});
};

export const getEstimation = (propertyId) => {
	return new Promise(async (res, rej) => {
		try {
			const { data: estimate } = await axios.get(
				`property/${propertyId}/estimation`
			);
			res(estimate);
		} catch (error) {
			rej(error);
		}
	});
};

export const getSimilarProperties = (
	propertyId,
	page = 1,
	limit = 10
): Promise<any[]> => {
	return new Promise(async (res, rej) => {
		try {
			const { data: properties } = await axios.get(
				`property/${propertyId}/similar?page=${page}&limit=${limit}`
			);
			res(properties);
		} catch (error) {
			rej(error);
		}
	});
};
