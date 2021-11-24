import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import { isMobileOnly } from "react-device-detect";

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
	getSimilarProperties,
	getMainProperty,
	getAgencies,
	getLeadProperties,
} from "../../../network-requests";
import { setMainPropertyId } from "../../../actions";

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

	const [propertiesPageNumber, setPropertiesPageNumber] = useState(1);
	const [propertiesPageLimit, setPropertiesPageLimit] = useState(
		isMobileOnly ? 2 : 4
	);
	const [totalSimilarProperties, setTotalSimilarProperties] = useState(0);
	const [isSimilarPropertiesLoadingMore, setIsSimilarPropertiesLoadingMore] =
		useState(false);
	const [
		isSimilarPropertiesLoadMoreAvailable,
		setIsSimilarPropertiesLoadMoreAvailable,
	] = useState(true);

	const [agenciesPageNumber, setAgenciesPageNumber] = useState(1);
	const [agenciesPageLimit, setAgenciesPageLimit] = useState(3);
	const [totalAgencies, setTotalAgencies] = useState(0);
	const [isAgenciesLoadingMore, setIsAgenciesLoadingMore] = useState(false);
	const [isAgenciesLoadMoreAvailable, setIsAgenciesLoadMoreAvailable] =
		useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		fetchAll();
	}, []);

	const fetchAll = async () => {
		try {
			setIsLoading(true);
			const promises = [_getProperties(), _getMainProperty()];
			await Promise.all(promises);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const _getProperties = async () => {
		return new Promise(async (res, rej) => {
			try {
				const _properties = await getLeadProperties();
				setProperties([..._properties]);
				res("");
			} catch (error) {
				rej(error);
				console.log(error);
			}
		});
	};

	const _getMainProperty = async () => {
		return new Promise(async (res, rej) => {
			try {
				const _property = await getMainProperty(mainPropertyId);
				if (_property) {
					setMainProperty(_property);
					dispatch(setMainPropertyId(_property.id));
					const estimate = await getEstimation(_property?.property?.id);
					setEstimation(estimate);
					const { items: _similarProperties, meta: similarPropertiesMeta } =
						await getSimilarProperties(
							_property?.id,
							propertiesPageNumber,
							propertiesPageLimit
						);
					setSimilarProperties([..._similarProperties]);
					setPropertiesPageNumber(similarPropertiesMeta?.currentPage);
					setTotalSimilarProperties(similarPropertiesMeta?.totalItems);
					setIsSimilarPropertiesLoadMoreAvailable(
						similarPropertiesMeta?.currentPage <
							similarPropertiesMeta?.totalPages
					);
					const { items: _agencies, meta: agenciesMeta } = await getAgencies(
						_property.id,
						agenciesPageNumber,
						agenciesPageLimit
					);
					console.log(agenciesMeta);
					setAgencies([..._agencies]);
					setAgenciesPageNumber(agenciesMeta?.currentPage);
					setTotalAgencies(agenciesMeta?.totalItems);
					setIsAgenciesLoadMoreAvailable(
						agenciesMeta?.currentPage < agenciesMeta?.totalPages
					);
					res("");
				}
			} catch (error) {
				rej(error);
				console.log(error);
			}
		});
	};

	const onLoadMoreSimilarProperties = async () => {
		try {
			setIsSimilarPropertiesLoadingMore(true);
			const { items, meta } = await getSimilarProperties(
				mainProperty?.id,
				propertiesPageNumber + 1,
				propertiesPageLimit
			);
			setSimilarProperties([...similarProperties, ...items]);
			setPropertiesPageNumber(meta?.currentPage);
			setTotalSimilarProperties(meta?.totalItems);
			setIsSimilarPropertiesLoadMoreAvailable(
				meta?.currentPage < meta?.totalPages
			);
			setIsSimilarPropertiesLoadingMore(false);
		} catch (error) {
			console.log(error);
		}
	};

	const onLoadMoreAgencies = async () => {
		try {
			setIsAgenciesLoadingMore(true);
			const { items, meta } = await getAgencies(
				mainProperty?.id,
				agenciesPageNumber + 1,
				agenciesPageLimit
			);
			setAgencies([...agencies, ...items]);
			setAgenciesPageNumber(meta?.currentPage);
			setTotalAgencies(meta?.totalItems);
			setIsAgenciesLoadMoreAvailable(meta?.currentPage < meta?.totalPages);
			setIsAgenciesLoadingMore(false);
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
			<div className="Dashboard container-lg d-flex ">
				<NavBarContainer />
				<div className="Dashboard__container">
					<MainInfoBlock mainProperty={mainProperty?.property} />
					<EstimateBlock estimation={estimation} mainProperty={mainProperty} />
					<PropertiesBlock
						similarProperties={similarProperties}
						totalSimilarProperties={totalSimilarProperties}
						onLoadMore={onLoadMoreSimilarProperties}
						isLoadingMore={isSimilarPropertiesLoadingMore}
						mainProperty={mainProperty}
						isLoadMoreAvailable={isSimilarPropertiesLoadMoreAvailable}
					/>
					<FindAgentBlock
						properties={properties}
						agencies={agencies}
						onLoadMore={onLoadMoreAgencies}
						isLoadingMore={isAgenciesLoadingMore}
						mainProperty={mainProperty}
						isLoadMoreAvailable={isAgenciesLoadMoreAvailable}
						totalAgencies={totalAgencies}
					/>
				</div>
			</div>
			<FooterContainer />
		</>
	);
};

export default SellerDashboard;
