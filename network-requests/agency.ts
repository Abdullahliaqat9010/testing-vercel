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

export const addLimitedAgncies = (limitedAgenciesData) => {
	return new Promise(async (res, rej) => {
		try {
			await axios.post("limited-agency", {
				...limitedAgenciesData,
			});
			res("");
		} catch (error) {
			rej(error);
		}
	});
};

export const getAgenciesByAddress = (address): Promise<any[]>=> {
	return new Promise(async (res, rej) => {
		try {
			console.log("adress", address)
			const {data: agencies }= await axios.get("agency/search?city="+ address.locality+ "&zip=" +address.zip , {
				headers: {
					"Content-Type": "application/json"
				}
			}) 
			res(agencies);
		} catch (error) {
			rej(error);
		}
	});
};

export const getLimitedAgenciesByAddress = (address): Promise<any[]>=> {
	return new Promise(async (res, rej) => {
		try {
			console.log("adress", address)
			const {data : limitedAgencies }= await axios.get("limited-agency/search?city="+ address.locality+ "&zip=" +address.zip , {
				headers: {
					"Content-Type": "application/json"
				}
			}) 
			res(limitedAgencies);
		} catch (error) {
			rej(error);
		}
	});
};

export const getAgencyProperties = (page = 1, limit = 10): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			const { data: properties } = await axios.get("agency/properties/all", {
				params: {
					page,
					limit,
				},
			});
			res(properties);
		} catch (error) {
			rej(error);
		}
	});
};

export const getAgencyProfile = (): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			const { data } = await axios.get("agency/profile");
			res(data);
		} catch (error) {
			rej(error);
		}
	});
};


export const getAgencyById = (id: number): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			console.log("sjhajd, agency")

			const { data } = await axios.get(`agency/profile/${id}`);
			res(data);
		} catch (error) {
			rej(error);
		}
	});
};

export const getLimitedAgencyById = (id: number): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			console.log("sjhajd, limited agency")
			const { data } = await axios.get(`limited-agency/${id}`);
			res(data);
		} catch (error) {
			rej(error);
		}
	});
};

export const createAgencyProfile = (profile) => {
	return new Promise(async (res, rej) => {
		try {
			await axios.put("agency", {
				...profile,
				zip: String(profile?.zip),
				billing_zip: String(profile?.billing_zip),
				street_number: String(profile?.street_number),
				billing_street_number: String(profile?.billing_street_number),
			});
			res("");
		} catch (error) {
			rej(error);
		}
	});
};

export const updateAgencyProfile = (profile) => {
	return new Promise(async (res, rej) => {
		try {
			await axios.put("agency", {
				...profile,
			});
			res("");
		} catch (error) {
			rej(error);
		}
	});
};

export const getAgencies = (): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			const { data: agencies } = await axios.get("agency");
			res(agencies);
		} catch (error) {
			rej(error);
		}
	});
};
