import axios from "axios";
import jwt from "jsonwebtoken";
import { setTokens } from ".";
import { UserProfile } from "../types/profile";

export const signupLead = (userData): Promise<any> => {
	return new Promise(async (res, rej) => {
		try {
			const { data } = await axios.post("lead/signup", {
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
