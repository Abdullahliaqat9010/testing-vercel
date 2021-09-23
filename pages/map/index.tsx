import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import _3dMap from "../../components/3dMap";

const Map = () => {
	return <_3dMap />;
};

export default Map;

export const getStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [])),
		},
	};
};
