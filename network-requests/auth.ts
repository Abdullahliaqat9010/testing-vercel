import axios from "axios";
import jwt from "jsonwebtoken";
import { UserProfile } from "../types/profile";

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
			const parsedData = jwt.decode(data?.access_token) as UserProfile;
			await setTokens(data?.access_token, data?.refresh_token);
			res(parsedData);
		} catch (error) {
			rej(error);
		}
	});
};

export const login = (email, password): Promise<UserProfile> => {
	return new Promise(async (res, rej) => {
		try {
			const { data } = await axios.post("auth/login", {
				email,
				password,
			});
			const parsedData = jwt.decode(data?.access_token) as UserProfile;
			await setTokens(data?.access_token, data?.refresh_token);
			res(parsedData);
		} catch (error) {
			rej(error);
		}
	});
};

export const recoverPassword = (email, locale) => {
	return new Promise(async (res, rej) => {
		try {
			await axios.post("auth/recover-password", {
				email,
				locale,
			});
			res("");
		} catch (error) {
			rej(error);
		}
	});
};

export const resetPassword = (token, password) => {
	return new Promise(async (res, rej) => {
		try {
			await axios.post("auth/reset-password", {
				token,
				password,
			});
			res("");
		} catch (error) {
			rej(error);
		}
	});
};