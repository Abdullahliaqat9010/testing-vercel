import cookie from "cookie";

export default (req, res) => {
	res.setHeader("Set-Cookie", [
		cookie.serialize("access_token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			expires: new Date(0),
			sameSite: "strict",
			path: "/",
		}),
		cookie.serialize("refresh_token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			expires: new Date(0),
			sameSite: "strict",
			path: "/",
		}),
	]);
	res.statusCode = 200;
	res.json({ success: true });
};
