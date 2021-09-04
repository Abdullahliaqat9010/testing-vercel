const { i18n } = require("./next-i18next.config");
const withImages = require("next-images");
const withFonts = require("next-fonts");

module.exports = withFonts(
	withImages({
		i18n,
		env: {
			GOOGLE_MAP_API_KEY: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
			SITE_TITLE: process.env.REACT_APP_SITE_TITLE,
			APP_API: process.env.REACT_APP_API,
			GOOGLE_METRIC_KEY: process.env.REACT_APP_GOOGLE_METRIC_KEY,
			COOKIE_KEY: process.env.REACT_APP_COOKIE_KEY,
		},
		rewrites: () => [
			{ source: "/auth-api/:path*", destination: "/api/:path*" },
		],
	})
);
