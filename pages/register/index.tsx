import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ProgressBar } from "react-bootstrap";

import HeaderContainer from "../../containers/Header";
import { useTranslation } from "next-i18next";
import SignupForm from "../../components/SignupForm";
import AgencyInfo from "./AgencyInfo";

const Register = () => {
	const { t } = useTranslation("header");

	const [step, setStep] = useState(1);

	return (
		<>
			<HeaderContainer mainPage title={t("title")} />
			<div className="register-page-container">
				<ProgressBar
					style={{ width: "100%", height: 4 }}
					now={(step * 100) / 3}
				/>
				{step === 1 ? (
					<SignupForm
						accountType="professional"
						onRegister={(values) => console.log(values)}
					/>
				) : step === 2 ? (
					<AgencyInfo onSubmit={() => null} />
				) : null}
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
