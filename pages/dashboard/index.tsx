import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import DashboardPageContainer from "../../containers/DashboardPageContainer";
import { GetServerSideProps } from "next";
import { requireAuthentication } from "../../utils/requireAuthentication";

const DashboardPage = () => {
	return <DashboardPageContainer />;
};

export const getServerSideProps = requireAuthentication(async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"dashboard-page",
				"header",
				"common",
			])),
		},
	};
});

// export const getStaticProps = async ({ locale }) => {
// 	return {
// 		props: {
// 			...(await serverSideTranslations(locale, [
// 				"dashboard-page",
// 				"header",
// 				"common",
// 			])),
// 		},
// 	};
// };
export default DashboardPage;
