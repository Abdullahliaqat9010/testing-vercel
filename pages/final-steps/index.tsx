import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import HeaderContainer from "../../containers/Header";
import GoogleMap from "../../components/GoogleMap";
import CreatePersonalAccount from "../main/StepsBlock/CreatePersonalAccount";
import FinalStep from "../main/StepsBlock/FinalStep";

import { RootState } from "../../types/state";
import { userToken } from "../../config/siteConfigs";
import { GetServerSideProps } from "next";
import { handleAlreadyAuthenticated } from "../../utils/handleAlreadyAuthenticated";

const FinalStepsPage = () => {
	const { t } = useTranslation("header");
	const router = useRouter();
	const { locale } = router;

	const { goToDashboard } = useSelector((state: RootState) => state.stepsInfo);

	const [step, changeStep] = useState<boolean>(false);

	// useEffect(() => {
	//   if (goToDashboard) {
	//     router.push(
	//       '/dashboard',
	//       userToken !== null ? locale + '/dashboard' : locale + '/success',
	//       {locale: locale}
	//       );
	//   }
	// }, [userToken, goToDashboard]);

	const handleSwitchSteps = () => {
		return changeStep(!step);
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
								<GoogleMap />
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
