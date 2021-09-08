import React, { useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import HeaderContainer from "../../containers/Header";
import { useTranslation } from "next-i18next";
import SignupForm from "../../components/SignupForm";
import AgencyInfo from "./AgencyInfo";
import CompanyDetails from "./CompanyDetails";
import { createAgencyProfile, signup } from "../../network-requests";
import { userSignupAction } from "../../actions";
import { RootState } from "../../types/state";

const Register = () => {
	const { t } = useTranslation("header");
	const dispatch = useDispatch();
	const router = useRouter();

	const isLoggedIn = useSelector<RootState>((state) => state.userInfo.auth);
	const agency_owner = useSelector<RootState>((state) => state.userInfo.id);

	const [step, setStep] = useState(1);
	const [agencyInfo, setAgencyInfo] = useState(null);

	useEffect(() => {
		if (isLoggedIn) {
			setStep(2);
		}
	}, []);

	const registerAgencyOwner = (userData, actions) => {
		return new Promise(async (res, rej) => {
			try {
				const parsedData = await signup({ ...userData, account_type: "agent" });
				dispatch(
					userSignupAction({
						userName: parsedData?.firstname,
						userSurname: parsedData?.lastname,
						userEmail: parsedData?.email,
						userPhone: parsedData?.phone_number,
						gender: parsedData?.gender,
						avatar: parsedData?.avatar,
						emailVerified: parsedData?.email_verified,
						accountType: parsedData?.account_type,
						id: parsedData?.id,
						t_c: parsedData?.t_c,
						promo_mailing: parsedData?.promo_mailing,
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
					agency_owner,
				});
				res("");
				router.push("/dashboard");
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
		...(await serverSideTranslations(locale, ["main-page", "header", "steps"])),
	},
});

export default Register;
