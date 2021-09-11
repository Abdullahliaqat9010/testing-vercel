import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/state";
import SellerProperties from "./seller/index.component";
import AgencyProperties from "./agency/index.component";

const Properties = () => {
	const accountType = useSelector(
		(state: RootState) => state?.userInfo?.account_type
	);

	return accountType === "seller" ? <SellerProperties /> : <AgencyProperties />;
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, [
			"header",
			"properties-page",
			"common",
		])),
	},
});

export default Properties;
