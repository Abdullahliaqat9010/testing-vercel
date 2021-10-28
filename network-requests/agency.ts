import axios from "axios";
import jwt from "jsonwebtoken";
import { setTokens } from "./auth";
import { UserProfile } from "../types/profile";

export const signupAgent = (userData): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			const { data } = await axios.post("agent/signup", {
				...userData,
			});
			const parsedData = jwt.decode(data?.access_token) as UserProfile;
			await setTokens(data?.access_token, data?.refresh_token);
			res(parsedData);
		} catch (error) {
			rej(error);
		}
	});
};

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

export const getAgenciesByAddress = (address): Promise<any[]> => {
	return new Promise(async (res, rej) => {
		try {
			const { data: agencies } = await axios.get("agency/search?city=" + address.city + "&zip=" + address.zip, {
				headers: {
					"Content-Type": "application/json"
				}
			});
			res(agencies);
		} catch (error) {
			rej(error);
		}
	});
};

export const getLimitedAgenciesByAddress = (address): Promise<any[]> => {
	return new Promise(async (res, rej) => {
		try {
			const { data: limitedAgencies } = await axios.get("limited-agency/search?city=" + address.city + "&zip=" + address.zip, {
				headers: {
					"Content-Type": "application/json"
				}
			});
			res(limitedAgencies);
		} catch (error) {
			rej(error);
		}
	});
};

export const getAgencyProperties = (page = 1, limit = 10): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			const { data: properties } = await axios.get("agency/properties", {
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
			await axios.post("agency", {
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

export const getLatLongFromAddress = (payload): Promise<any[]> => {
	return new Promise(async (res, rej) => {
		const { searchValue, type } = payload;
		try {
			const { data } = await axios.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?country=BE&language=en&types=${type}&access_token=pk.eyJ1IjoibWF0dGVvZ3JhY2VmZmEiLCJhIjoiY2txYjBiZW11MDVwcjJwbm1yMmdlaGY2eSJ9.5LiTaHbs8vlwsjwAMzm1eA`
			);
			console.log("res", res);
			const listArr = [];

			const { features } = data;
			if (features.length > 0) {
				features.map((item) => {
					listArr.push({
						id: item.id,
						fullAddress: type === "place" ? item.text : item.place_name,
						location: {
							lng: item.center[0],
							lat: item.center[1],
						},
						postcode:
							item.context.filter((el) => el.id.indexOf("postcode") !== -1)[0]
								?.text || "",
						place:
							item.context.filter((el) => el.id.indexOf("place") !== -1)[0]
								?.text || "",
						region:
							item.context.filter((el) => el.id.indexOf("region") !== -1)[0]
								?.text || "",
						locality:
							item.context.filter((el) => el.id.indexOf("locality") !== -1)[0]
								?.text || "",
						street: item?.text || "",
						number: item?.address || "",
						country:
							item.context.filter((el) => el.id.indexOf("country") !== -1)[0]
								?.text || "",
					});
				});
			}
			res(listArr);
		} catch (error) {
			rej(error);
		}
	});
};
export const createAgencyProperty = (payload) => {
	return new Promise(async (res, rej) => {
		try {
			await axios.post("agency/property", { ...payload });
			res("");
		} catch (error) {
			rej(error);
		}
	});
};
