import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

import NavBarContainer from "../../../containers/NavBar";
import MainInfoBlock from "./MainInfoBlock";
import EstimateBlock from "./EstimateBlock";
import PropertiesBlock from "./PropertiesBlock";
import FindAgentBlock from "./FindAgentBlock";
import FooterContainer from "../../../containers/Footer";
import HeaderContainer from "../../../containers/Header";
import Loading from "../../../components/Loading";

import { RootState } from "../../../types/state";
import {
	getEstimation,
	getProperties,
	getSimilarProperties,
	getProperty,
} from "../../../network-requests";

const SellerDashboard = () => {
	const mainPropertyId = useSelector(
		(state: RootState) => state.property.mainPropertyId
	);
	const { t } = useTranslation("dashboard-page");
	const userId = useSelector<RootState>((state) => state.userInfo.id);

	const [isLoading, setIsLoading] = useState(true);
	const [mainProperty, setMainProperty] = useState(null);
	const [estimation, setEstimation] = useState(null);
	const [similarProperties, setSimilarProperties] = useState([]);
	// const [properties, setProperties] = useState([]);

	useEffect(() => {
		_getProperties();
	}, []);

	const _getProperties = async () => {
		try {
			setIsLoading(true);
			const _properties = await getProperty(mainPropertyId);
			setMainProperty(_properties);
			if (_properties) {
				setMainProperty(_properties);
				const estimate = await getEstimation(_properties?.id);
				setEstimation(estimate);
				const _similarProperties = await getSimilarProperties(_properties?.id);
				setSimilarProperties([..._similarProperties]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			{/* <VerifyEmailModal /> */}
			<HeaderContainer title={t("title")} />
			<div className="Dashboard container d-flex">
				<NavBarContainer />
				<div className="Dashboard__container">
					<MainInfoBlock mainProperty={mainProperty} />
					<EstimateBlock estimation={estimation} mainProperty={mainProperty} />
					<PropertiesBlock
						similarProperties={similarProperties}
						mainProperty={mainProperty}
					/>
					<FindAgentBlock
						properties={[mainProperty]}
						mainProperty={mainProperty}
					/>
				</div>
			</div>
			<FooterContainer />
		</>
	);
};

export default SellerDashboard;
