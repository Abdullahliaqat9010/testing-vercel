import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSelector } from "react-redux";

import SellerDashboard from "./Seller/index.component";
import { requireAuthentication } from "../../utils/requireAuthentication";
import { RootState } from "../../types/state";

const DashboardPage = () => {
	const account_type = useSelector<RootState>(
		(state) => state.userInfo.account_type
	);

	return (
		<React.Fragment>
			{account_type === "seller" ? <SellerDashboard /> : <SellerDashboard />}
		</React.Fragment>
	);
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

export default DashboardPage;
