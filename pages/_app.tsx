import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { store, persistor } from "../store";
import { config } from "../config/siteConfigs";
import axios, { AxiosError, AxiosResponse } from "axios";

import TagManager from "react-gtm-module";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/globals.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/navbar.scss";
import "../styles/property-block.scss";
import "../styles/agency-block.scss";
import "../styles/contact-agent-modal.scss";
import "../styles/pages/main.scss";
import "../styles/pages/dashboard.scss";
import "../styles/pages/agency.scss";
import "../styles/pages/property.scss";
import "../styles/pages/properties.scss";
import "../styles/pages/settings.scss";
import "../styles/pages/login.scss";
import "../styles/pages/pravicy-and-terms.scss";
import "../styles/pages/pro-workspace.scss";
import "../styles/pages/404.scss";
import "../styles/pages/create-blog.scss";
import "../styles/pages/blogs.scss";
import "../styles/pages/register.scss";
import "../styles/pages/estimate.scss";
import "../styles/pages/sold-properties.scss";
import "../styles/PropertyDetailsModal.scss";
import "../styles/pages/agency-settings.scss";
import "../styles/map.scss";

const refreshAccessToken = (): Promise<void> => {
	return new Promise(async (res, rej) => {
		try {
			const access_token = localStorage.getItem("access_token");
			const refresh_token = localStorage.getItem("refresh_token");
			if (access_token && refresh_token) {
				const req = await fetch(`${config.apiDomain}/auth/refresh-token`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						access_token,
						refresh_token,
					}),
				});
				const { access_token: _access_token } = await req.json();
				localStorage.setItem("access_token", _access_token);
				await fetch("/auth-api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						access_token: _access_token,
					}),
				});
				res();
			} else {
				rej("Invalid access_token or refresh_token");
			}
		} catch (error) {
			rej(error);
		}
	});
};

const tagManagerArgs = {
	gtmId: config.metricKey,
};

axios.interceptors.request.use(
	async (request) => {
		if (request && typeof window !== undefined) {
			const access_token = localStorage.getItem("access_token");
			request.baseURL = config.apiDomain;
			request.headers["Authorization"] = `Bearer ${access_token}`;
		}
		return request;
	},
	(error) => {
		Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response: AxiosResponse<any>) => {
		return response;
	},
	async (error: AxiosError) => {
		const originalRequest = error.config as any;
		if (
			error?.response?.status === 401 &&
			!originalRequest._retry &&
			error?.response?.data?.message !== "auth/invalid" &&
			typeof window !== undefined
		) {
			originalRequest._retry = true;
			try {
				await refreshAccessToken();
			} catch (error) {
				console.log(error);
			}
			return axios(originalRequest);
		}
		return Promise.reject(error);
	}
);

const MyApp = ({ Component, pageProps }) => {
	const router = useRouter();

	const { locale } = router;
	const { i18n } = useTranslation();

	useEffect(() => {
		TagManager.initialize(tagManagerArgs);
	}, []);

	useEffect(() => {
		i18n.changeLanguage(locale);
	}, [locale]);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
};

export default appWithTranslation(MyApp);
