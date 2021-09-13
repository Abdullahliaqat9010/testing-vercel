import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button } from "react-bootstrap";

import NavBarContainer from "../../../containers/NavBar";
import FooterContainer from "../../../containers/Footer";
import HeaderContainer from "../../../containers/Header";

import AddIcon from "../../../assets/images/icon-plus.svg";
import ArrowIcon from "../../../assets/images/arrow-blue.svg";
import SquareIcon from "../../../assets/images/square.svg";
import BedsIcon from "../../../assets/images/beds.svg";
import BathIcon from "../../../assets/images/bath.svg";

import { RootState } from "../../../types/state";
import { getProperties } from "../../../network-requests";
import Loading from "../../../components/Loading";

const PropertiesPage = () => {
	const { t } = useTranslation("properties-page");
	const router = useRouter();
	const { locale } = router;
	const userId = useSelector<RootState>((state) => state.userInfo.id);

	const [isLoading, setIsLoading] = useState(true);

	const [properties, setProperties] = useState([]);
	const _getProperties = async () => {
		try {
			setIsLoading(true);
			const _properties = await getProperties(userId);
			setProperties([..._properties]);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		_getProperties();
	}, []);

	const gotToEstimate = () => {
		router.push("/estimate");
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<HeaderContainer title={t("title")} />
			<div className="PropertiesPage container d-flex">
				<NavBarContainer />
				<div className="PropertiesPage__container w-100">
					<div className="title-block d-flex justify-content-between">
						<h1>{t("title")}</h1>
						<Button className="new-estimate" onClick={gotToEstimate}>
							<img src={AddIcon} alt="AddIcon" />
							<span>{t("button.new-estimate")}</span>
						</Button>
					</div>
					{properties.length > 0 &&
						properties.map((property, index) => (
							<div className="property" key={index}>
								<div className="property__head">
									<span className="address">{property.search_address}</span>
									<Link href={`/property/${property.id}`} locale={locale}>
										<span className="blue">
											{t("link.view")} <img src={ArrowIcon} alt="ArrowIcon" />
										</span>
									</Link>
								</div>
								<div className="property__body">
									<div className="short-info">
										<div className="square">
											<img src={SquareIcon} alt="SquareIcon" />
											<div className="info-block">
												<span className="gray">{t("span.square")}</span>
												<span>{property.total_area}m²</span>
											</div>
										</div>
										<div className="beds">
											<img src={BedsIcon} alt="BedsIcon" />
											<div className="info-block">
												<span className="gray">{t("span.beds")}</span>
												<span>{property.bedrooms}</span>
											</div>
										</div>
										<div className="baths">
											<img src={BathIcon} alt="BathIcon" />
											<div className="info-block">
												<span className="gray">{t("span.baths")}</span>
												<span>{property.bathrooms}</span>
											</div>
										</div>
									</div>
									<div className="property-estimation">
										<p>{t("p.property-estimation")}</p>
										<div className="d-flex align-items-center custom-block">
											<div className="minimal d-flex flex-column">
												<span className="estimation-title">
													{t("span.minimal")}
												</span>
												<span className="estimation-desc">€1,007,500</span>
												<span className="estimation-per-metre">
													€1,007.500 {t("span.price-unit")} m²
												</span>
											</div>
											<div className="average d-flex flex-column">
												<span className="estimation-title">
													{t("span.average")}
												</span>
												<span className="estimation-desc">€1,097,500</span>
												<span className="estimation-per-metre">
													€1,097.500 {t("span.price-unit")} m²
												</span>
											</div>
											<div className="maximal d-flex flex-column">
												<span className="estimation-title">
													{t("span.maximal")}
												</span>
												<span className="estimation-desc">€1,197,500</span>
												<span className="estimation-per-metre">
													€1,197.500 {t("span.price-unit")} m²
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<FooterContainer />
		</>
	);
};

export default PropertiesPage;
