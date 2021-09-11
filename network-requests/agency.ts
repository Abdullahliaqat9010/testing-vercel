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
