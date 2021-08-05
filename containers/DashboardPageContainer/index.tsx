import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";

import { userToken } from "../../config/siteConfigs";

import NavBarContainer from "../../containers/NavBar";
import MainInfoBlock from "../../containers/DashboardPageContainer/MainInfoBlock";
import EstimateBlock from "../../containers/DashboardPageContainer/EstimateBlock";
import PropertiesBlock from "../../containers/DashboardPageContainer/PropertiesBlock";
import FindAgentBlock from "../../containers/DashboardPageContainer/FindAgentBlock";
import FooterContainer from "../../containers/Footer";
import HeaderContainer from "../../containers/Header";
import ContactAgentModal from "../../containers/Modals/ContactAgentModal";
import VerifyEmailModal from "../../containers/Modals/VerifyEmailModal";

import {
	clearStepsStateAction,
	getPropertyForCurrentUserAction,
	setUserDataAction,
} from "../../actions";
import { parseJwt } from "../../utils";
import { RootState } from "../../types/state";

const withAuth = (Component) => {
	const Auth = (props) => {
		// Login data added to props via redux-store (or use react context for example)
		const isLoggedIn = localStorage.getItem("access_token");
		console.log(isLoggedIn);
		console.log(localStorage.getItem("access_token"));
		// If user is not logged in, return login component
		if (!isLoggedIn) {
			return null;
		}

		// If user is logged in, return original component
		return <Component {...props} />;
	};

	// Copy getInitial props so it will run as well
	if (Component.getInitialProps) {
		Auth.getInitialProps = Component.getInitialProps;
	}

	return Auth;
};

const DashboardPageContainer = () => {
	const { t } = useTranslation("dashboard-page");
	const dispatch = useDispatch();
	const router = useRouter();
	const { goToDashboard } = useSelector((state: RootState) => state.stepsInfo);

	/**
	 * @todo Add private routes
	 */
	// useEffect(() => {
	// 	if (goToDashboard && !userToken) {
	// 		router.reload();
	// 	}

	// 	if (!userToken && !goToDashboard) {
	// 		window.location.href = "/";
	// 	}
	// }, [userToken, goToDashboard]);

	useEffect(() => {
		if (userToken) {
			const parseData = parseJwt(userToken);
			const elementsOnPage = isMobile ? 3 : 6;
			dispatch(
				setUserDataAction({
					firstName: parseData.firstName,
					lastName: parseData.lastName,
				})
			);
			dispatch(
				getPropertyForCurrentUserAction({
					userId: parseData.id,
					elementsOnPage,
				})
			);
			dispatch(clearStepsStateAction());
		}
	}, [goToDashboard]);

	return (
		<>
			<ContactAgentModal />
			<VerifyEmailModal />
			<HeaderContainer title={t("title")} />
			<div className="Dashboard container d-flex">
				<NavBarContainer />
				<div className="Dashboard__container">
					<MainInfoBlock />
					<EstimateBlock />
					<PropertiesBlock />
					<FindAgentBlock />
				</div>
			</div>
			<FooterContainer />
		</>
	);
};

export default withAuth(DashboardPageContainer);
