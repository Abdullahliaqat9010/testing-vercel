import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/state";
import SellerProperties from "./Seller/index.component";
import AgencyProperties from "./Agency/index.component";
import { requireAuthentication } from "../../utils/requireAuthentication";

const Properties = () => {
	const accountType = useSelector(
		(state: RootState) => state?.userInfo?.account_type
	);

	return accountType === "seller" ? <SellerProperties /> : <AgencyProperties />;
};

export const getServerSideProps = requireAuthentication(async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, [
			"header",
			"properties-page",
			"common",
		])),
	},
}));

export default Properties;
