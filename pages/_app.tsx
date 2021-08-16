import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import axios from "axios";

import { store, persistor } from "../store";
import { config } from "../config/siteConfigs";

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

const tagManagerArgs = {
	gtmId: config.metricKey,
};

axios.interceptors.request.use(
	(request) => {
		if (request) {
			request.baseURL = config.apiDomain;
			// request.headers["Authorization"] =
			// 	"Bearer " + window.localStorage.getItem("access_token");
		}
		return request;
	},
	(error) => {
		Promise.reject(error);
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
		<>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		</>
	);
};

export default appWithTranslation(MyApp);
