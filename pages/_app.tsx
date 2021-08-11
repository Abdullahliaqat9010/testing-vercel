import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Html } from "next/document";

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
			{/* <Head>
				<link
					href="https://cdn.osmbuildings.org/4.1.1/OSMBuildings.css"
					rel="stylesheet"
				/>

				<script src="https://cdn.osmbuildings.org/4.1.1/OSMBuildings.js" />
			</Head> */}
			{/* <body> */}
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{/* <Html /> */}
					<Head>
						<link
							href="https://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"
							rel="stylesheet"
						/>
						<link
							href="https://cdn.osmbuildings.org/4.1.1/OSMBuildings.css"
							rel="stylesheet"
						/>
						<link rel="preconnect" href="https://fonts.googleapis.com" />
						<link rel="preconnect" href="https://fonts.gstatic.com" />
						<link
							href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600&family=Nunito+Sans:wght@800&display=swap"
							rel="stylesheet"
						/>
						<script src="https://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js" />
						<script src="https://cdn.osmbuildings.org/classic/0.2.2b/OSMBuildings-Leaflet.js" />
						<script src="https://cdn.osmbuildings.org/4.1.1/OSMBuildings.js" />
					</Head>
					<Component {...pageProps} />
					{/* </Html> */}
				</PersistGate>
			</Provider>
			{/* </body> */}
		</>
	);
};

export default appWithTranslation(MyApp);
