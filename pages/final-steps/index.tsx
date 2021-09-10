import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";

import HeaderContainer from "../../containers/Header";
import GoogleMap from "../../components/GoogleMap";
import CreatePersonalAccount from "../estimate/StepsBlock/CreatePersonalAccount";
import FinalStep from "../estimate/StepsBlock/FinalStep";

import { RootState } from "../../types/state";
import { handleAlreadyAuthenticated } from "../../utils/handleAlreadyAuthenticated";

const FinalStepsPage = () => {
	const { t } = useTranslation("header");
	const location = useSelector<RootState>(
		(state) => state.stepsInfo.stepBlock.location
	) as any;

	const [step, changeStep] = useState<boolean>(false);

	const handleSwitchSteps = () => {
		return changeStep(!step);
	};

	const mapProps = {
		markers: [
			{
				position: {
					lat: location?.lat,
					lng: location?.lng,
				},
				type: "home",
				id: null,
			},
		],
	};

	return (
		<>
			<HeaderContainer mainPage title={t("title")} />
			<div className="main-page">
				<div className="steps-block">
					<ProgressBar className="steps-block__progress-bar" now={100} />
					<div className="steps-block__main d-flex">
						<div className="ml-156 w-50 mt-57">
							{!step ? (
								<CreatePersonalAccount handleSwitchSteps={handleSwitchSteps} />
							) : (
								<FinalStep handleSwitchSteps={handleSwitchSteps} />
							)}
						</div>
						{!isMobile && (
							<div className="w-50 position-relative">
								<GoogleMap {...mapProps} />
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = handleAlreadyAuthenticated(
	async ({ locale }) => ({
		props: {
			...(await serverSideTranslations(locale, [
				"main-page",
				"header",
				"steps",
			])),
		},
	})
);

export default FinalStepsPage;
