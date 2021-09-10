import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { isMobile } from "react-device-detect";

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
import { getEstimation, getProperties } from "../../network-requests";

const DashboardPageContainer = () => {
	const { t } = useTranslation("dashboard-page");
	const dispatch = useDispatch();
	const { goToDashboard } = useSelector((state: RootState) => state.stepsInfo);
	const userId = useSelector<RootState>((state) => state.userInfo.id);

	const [isLoading, setIsLoading] = useState(false);
	const [properties, setProperties] = useState([]);
	const [mainProperty, setMainProperty] = useState(null);
	const [estimation, setEstimation] = useState(null);

	useEffect(() => {
		fetchAll();
	}, []);

	const _getProperties = async () => {
		try {
			const _properties = await getProperties(userId);
			setProperties([..._properties]);
			if (_properties.length > 0) {
				setMainProperty(_properties[0]);
				const estimate = await getEstimation(_properties[0]?.id);
				setEstimation(estimate);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchAll = async () => {
		try {
			setIsLoading(true);
			const promises = [_getProperties()];
			await Promise.all(promises);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

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

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<>
			{/* <ContactAgentModal /> */}
			{/* <VerifyEmailModal /> */}
			<HeaderContainer title={t("title")} />
			<div className="Dashboard container d-flex">
				<NavBarContainer />
				<div className="Dashboard__container">
					<MainInfoBlock mainProperty={mainProperty} />
					<EstimateBlock estimation={estimation} mainProperty={mainProperty} />
					{/* <PropertiesBlock /> */}
					{/* <FindAgentBlock /> */}
				</div>
			</div>
			<FooterContainer />
		</>
	);
};

export default DashboardPageContainer;
