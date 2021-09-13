import axios from "axios";

export const contactAgency = (contactInfo) => {
	return new Promise(async (res, rej) => {
		try {
			await axios.post("agency/contact", {
				...contactInfo,
			});
			res("");
		} catch (error) {
			rej(error);
		}
	});
};

export const getAgencyProperties = (): Promise<any[]> => {
	return new Promise(async (res, rej) => {
		try {
			const { data: properties } = await axios.get("agency/properties/all");
			res(properties);
		} catch (error) {
			rej(error);
		}
	});
};
