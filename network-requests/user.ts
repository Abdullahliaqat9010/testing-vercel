import axios from "axios";

export const signup = () => {
	return new Promise(async (res, rej) => {
		try {
			const { data } = await axios.post("auth/signup");
			res(data);
		} catch (error) {
			rej(error);
		}
	});
};
