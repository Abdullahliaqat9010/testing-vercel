import axios from "axios";

export const createLeadProperty = (property, locale: string): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			const { data } = await axios.post(
				"lead/property",
				{
					...property,
				},
				{
					params: {
						locale,
					},
				}
			);
			res(data);
		} catch (error) {
			rej(error);
		}
	});
};

export const getMainProperty = (id?: number | null): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			const { data: property } = await axios.get("lead/main-property", {
				params: { id },
			});
			res(property);
		} catch (error) {
			rej(error);
		}
	});
};

export const getLeadProperties = (): Promise<any[]> => {
	return new Promise(async (res, rej) => {
		try {
			const { data: properties } = await axios.get(`lead/properties`);
			if (properties && properties.length > 0) {
				res(properties);
			} else {
				res([]);
			}
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

export const getProperties = (userId) => {
	return new Promise(async (resolve, reject) => {
		// const property = await axios.get()
	});
};
