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
	getAgencies,
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
	const [properties, setProperties] = useState([]);
	const [agencies, setAgencies] = useState([]);

	useEffect(() => {
		fetchAll();
	}, []);

	const fetchAll = async () => {
		try {
			setIsLoading(true);
			const promises = [_getProperties(), getMainProperty(), _getAgencies()];
			await Promise.all(promises);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const _getProperties = async () => {
		try {
			const _properties = await getProperties(userId);
			setProperties([..._properties]);
		} catch (error) {
			console.log(error);
		}
	};

	const getMainProperty = async () => {
		try {
			const _property = await getProperty(mainPropertyId);
			if (_property) {
				setMainProperty(_property);
				const estimate = await getEstimation(_property?.id);
				setEstimation(estimate);
				const _similarProperties = await getSimilarProperties(_property?.id);
				setSimilarProperties([..._similarProperties]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const _getAgencies = async () => {
		try {
			const _agencies = await getAgencies();
			setAgencies([..._agencies]);
		} catch (error) {
			console.log(error);
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
						properties={properties}
						agencies={agencies}
						mainProperty={mainProperty}
					/>
				</div>
			</div>
			<FooterContainer />
		</>
	);
};

export default SellerDashboard;
