import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import ArrowIcon from "../../../../assets/images/arrow-blue.svg";

import { setUserProfile } from "../../../../actions";
import { RootState } from "../../../../types/state";

import { generatePropertyData } from "../../../../utils/generatePropertyData";
import SignupForm from "../../../../components/SignupForm";
import { createProperty, signup } from "../../../../network-requests";

const FinalStep = ({ handleSwitchSteps }: any) => {
	const { t } = useTranslation("steps");
	const router = useRouter();
	const dispatch = useDispatch();

	const {
		addressFromStepOne,
		additionalAddress,
		location,
		selectedProperty,
		propertyDetails,
		details,
		utilities,
		personalAccount,
	} = useSelector((state: RootState) => state.stepsInfo.stepBlock);

	const propertyData = () => {
		return {
			owner: Boolean(personalAccount.selectedItem === "homeowner"),
			interest: String(personalAccount.sellProperty),
			selling_way: String(personalAccount.howSell).length
				? String(personalAccount.howSell)
				: undefined,
			residence_type: String(personalAccount.selectedResidence),
			...generatePropertyData(
				addressFromStepOne,
				additionalAddress,
				selectedProperty,
				propertyDetails,
				details,
				utilities,
				location
			),
		};
	};

	const handleSubmit = (user) => {
		return new Promise(async (res, rej) => {
			try {
				const userProfile = await signup({
					...user,
					account_type: "seller",
				});
				await createProperty({ ...propertyData(), leadId: userProfile.id });
				dispatch(
					setUserProfile({
						...userProfile,
						account_type: "seller",
					})
				);
				router.push("/dashboard");
				res("");
			} catch (error) {
				rej(error);
			}
		});
	};

	const handleClickPrevBtn = () => {
		handleSwitchSteps();
	};

	const goToLogin = () => {
		window.sessionStorage.setItem(
			"forgotLogin",
			JSON.stringify(propertyData())
		);
		router.push("/login");
	};

	return (
		<div className="final-step">
			<span className="step-title">{t("title.good-job")}</span>
			<h4>{t("title.estimation-ready")}</h4>
			<span className="step-desc">{t("desc.finalized-estimation")}</span>
			<span className="have-account" onClick={goToLogin}>
				{t("link.already-have-account")}
				<img src={ArrowIcon} alt="ArrowIcon" />
			</span>
			<SignupForm
				onBack={handleClickPrevBtn}
				showTitle={false}
				onRegister={handleSubmit}
			/>
		</div>
	);
};

export default FinalStep;
