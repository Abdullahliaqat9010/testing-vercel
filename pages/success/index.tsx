import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import DashboardPageContainer from "../dashboard/Seller/index.component";

import { userToken } from "../../config/siteConfigs";

const SuccessPage = () => {
	const router = useRouter();
	const { locale } = router;

	useEffect(() => {
		if (userToken) {
			router.push("/dashboard", locale + "/dashboard", { locale: locale });
		}
	}, []);

	return <DashboardPageContainer />;
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, [
			"dashboard-page",
			"header",
			"common",
		])),
	},
});

export default SuccessPage;
