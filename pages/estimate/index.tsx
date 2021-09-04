import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderContainer from "../../containers/Header";
import StepsBlock from "../main/StepsBlock";

const Estimate = () => {
	const { t } = useTranslation();
	const [step, setStep] = useState<number | null>(0);
	return (
		<div className="main-page">
			<HeaderContainer step={step} title={t("title")} />
			<StepsBlock setStep={setStep} step={step} />
		</div>
	);
};

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, ["steps", "header", "common"])),
		},
	};
};

export default Estimate;
