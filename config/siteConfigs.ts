// Site Config =============================================================
export const config = {
	siteTitle: process.env.SITE_TITLE,
	apiDomain: process.env.APP_API,
	metricKey: process.env.GOOGLE_METRIC_KEY,
	cookieKey: process.env.COOKIE_KEY,
};

// Google Maps Configs =====================================================
export const googleMapConfig = {
	apiKey: process.env.GOOGLE_MAP_API_KEY || "",
};

export const userToken =
	typeof window === "object" && localStorage.getItem("access_token");
