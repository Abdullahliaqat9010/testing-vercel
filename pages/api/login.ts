import cookie from "cookie";

export default (req, res) => {
	let cookies = [
		cookie.serialize("access_token", req.body.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: 60 * 60 * 24 * 60,
			sameSite: "strict",
			path: "/",
		}),
	];
	if (req.body?.refresh_token) {
		cookies.push(
			cookie.serialize("refresh_token", req.body.refresh_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				maxAge: 60 * 60 * 24 * 60,
				sameSite: "strict",
				path: "/",
			})
		);
	}
	res.setHeader("Set-Cookie", cookies);
	res.statusCode = 200;
	res.json({ success: true });
};
