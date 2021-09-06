import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ProgressBar } from "react-bootstrap";

import HeaderContainer from "../../containers/Header";
import { useTranslation } from "next-i18next";
import SignupForm from "../../components/SignupForm";
import AgencyInfo from "./AgencyInfo";
import CompanyDetails from "./CompanyDetails";

const Register = () => {
	const { t } = useTranslation("header");

	const [step, setStep] = useState(1);
	const [agencyInfo, setAgencyInfo] = useState(null);

	const registerAgencyOwner = () => {
		return new Promise((res, rej) => {
			try {
			} catch (error) {}
		});
	};

	const onRegister = () => {
		setStep(step + 1);
	};

	const onAgencyInfo = (_agencyInfo) => {
		setAgencyInfo({ ..._agencyInfo });
		setStep(step + 1);
	};

	const onCompanyDetails = (companyDetails) => {
		console.log({
			...agencyInfo,
			...companyDetails,
		});
	};

	return (
		<>
			<HeaderContainer step={step - 1} mainPage title={t("title")} />
			<div className="register-page-container">
				<ProgressBar
					style={{ width: "100%", height: 4 }}
					now={(step * 100) / 3}
				/>
				{step === 1 ? (
					<SignupForm accountType="professional" onRegister={onRegister} />
				) : step === 2 ? (
					<AgencyInfo onSubmit={onAgencyInfo} />
				) : (
					<CompanyDetails
						onSubmit={onCompanyDetails}
						onBack={() => setStep(step - 1)}
						address={{
							city: agencyInfo?.city,
							street: agencyInfo?.street,
							street_number: agencyInfo?.street_number,
							zip: agencyInfo?.zip,
						}}
					/>
				)}
			</div>
		</>
	);
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ["main-page", "header", "steps"])),
	},
});

export default Register;
