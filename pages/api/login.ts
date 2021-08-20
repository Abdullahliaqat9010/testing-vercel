import cookie from "cookie";

export default (req, res) => {
	res.setHeader("Set-Cookie", [
		cookie.serialize("access_token", req.body.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: 60 * 60,
			sameSite: "strict",
			path: "/",
		}),
		cookie.serialize("refresh_token", req.body.refresh_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: 60 * 60,
			sameSite: "strict",
			path: "/",
		}),
	]);
	res.statusCode = 200;
	res.json({ success: true });
};
