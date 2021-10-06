import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ProgressBar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import HeaderContainer from "../../containers/Header";
import { useTranslation } from "next-i18next";
import SignupForm from "./SignupForm";
import AgencyInfo from "./AgencyInfo/index.component";
import CompanyDetails from "./CompanyDetails/index.component";
import { createAgencyProfile, signup } from "../../network-requests";
import { setUserProfile } from "../../actions";

const Register = () => {
	const { t } = useTranslation("register-agency-pages");
	const dispatch = useDispatch();
	const router = useRouter();

	const [step, setStep] = useState(1);
	const [agencyInfo, setAgencyInfo] = useState(null);

	const registerAgencyOwner = (userData) => {
		return new Promise(async (res, rej) => {
			try {
				const userProfile = await signup({
					...userData,
					account_type: "agent",
				});
				dispatch(
					setUserProfile({
						...userProfile,
						account_type: "agent",
					})
				);
				setStep((step) => step + 1);
				res("");
			} catch (error) {
				rej(error);
			}
		});
	};

	const setAgencyProfile = (companyDetails) => {
		return new Promise(async (res, rej) => {
			try {
				await createAgencyProfile({
					...agencyInfo,
					...companyDetails,
				});
				res("");
				router.push("/properties");
			} catch (error) {
				rej(error);
			}
		});
	};

	const onAgencyInfo = (_agencyInfo) => {
		setAgencyInfo({ ..._agencyInfo });
		setStep(step + 1);
	};

	return (
		<>
			<HeaderContainer step={step - 1} mainPage title={t("title")} />
			<div className="register-page-container">
				<ProgressBar
					style={{ width: "100%", height: 4 }}
					now={(step * 100) / 3}
				/>
				<div className="signup-form-container">
					{step === 1 ? (
						<SignupForm
							accountType="professional"
							onRegister={registerAgencyOwner}
						/>
					) : step === 2 ? (
						<AgencyInfo onSubmit={onAgencyInfo} />
					) : (
						<CompanyDetails
							onSubmit={setAgencyProfile}
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
			</div>
		</>
	);
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, [
			"register-agency-pages",
			"header",
		])),
	},
});

export default Register;
