import axios from "axios";
import jwt from "jsonwebtoken";

const setTokens = (access_token, refresh_token) => {
	return new Promise(async (res, rej) => {
		try {
			localStorage.setItem("access_token", access_token);
			localStorage.setItem("refresh_token", refresh_token);
			await fetch("/auth-api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					access_token,
					refresh_token,
				}),
			});
			res("");
		} catch (error) {
			rej(error);
		}
	});
};

export const signup = (userData): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			const { data } = await axios.post("auth/signup", {
				...userData,
			});
			const parsedData = jwt.decode(data?.access_token) as any;
			await setTokens(data?.access_token, data?.refresh_token);
			res(parsedData);
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
