import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { RootState } from "../../../types/state";

import arrowIcon from "../../../assets/images/arrow-blue.svg";
import squareIcon from "../../../assets/images/square.svg";
import bedsIcon from "../../../assets/images/beds.svg";
import bathIcon from "../../../assets/images/bath.svg";

const MainInfoBlock = ({ mainProperty }) => {
	const router = useRouter();
	const { locale } = router;
	const { t } = useTranslation("dashboard-page");

	const modifyProperty = () => {
		const propertyObjectForModify = {
			mainBlocks: true,
			stepBlock: {
				step: 0,
				addressFromStepOne: mainProperty.search_address,
				additionalAddress: {
					street: mainProperty.street,
					number: mainProperty.street_number,
					zip: mainProperty.zip,
					locality: mainProperty.locality,
					country: mainProperty.country,
				},
				selectedProperty: mainProperty.property_type,
				propertyDetails: {
					livingArea: mainProperty.live_area,
					landSurface: mainProperty.total_area,
					facadesNumber: mainProperty.facades,
					numberBedrooms: mainProperty.bedrooms,
					numberBathrooms: mainProperty.bathrooms,
					numberLevels: mainProperty.floor,
					numberFloors: mainProperty.levels,
					gardenTerrasValue: mainProperty.terras_size,
					elevator: mainProperty.elevator,
				},
				details: {
					prestige: mainProperty.prestige,
					condition: mainProperty.state,
					constructionYear: mainProperty.construction_year || "",
					renovationYear: mainProperty.renov_year || "",
					renovationLevel: mainProperty.renov_level || "0",
				},
				utilities: {
					epc: mainProperty.epc || "",
					view: mainProperty.view,
					orientation: mainProperty.orientation_terras,
					atticValue: mainProperty.attic || "",
					cellarValue: mainProperty.cellar || "",
					elevator: mainProperty.elevator,
					swimmingPool: mainProperty.pool,
					indoorGarage: mainProperty.indoor_garage,
					outdoorGarage: mainProperty.outdoor_garage,
					carport: mainProperty.carport,
					parking:
						mainProperty.carport ||
						mainProperty.outdoor_garage ||
						mainProperty.indoor_garage,
					solarPanels: mainProperty.solar_panels,
				},
				personalAccount: {
					// accountType: 'private',
					// selectedItem: '',
					selectedResidence: mainProperty.residence_type,
					sellProperty: mainProperty.interest,
					howSell: mainProperty.selling_way || "",
				},
				location: {
					lat: mainProperty.lat,
					lng: mainProperty.lng,
				},
			},
		};
		window.sessionStorage.setItem(
			"modify",
			JSON.stringify(propertyObjectForModify)
		);
		window.sessionStorage.setItem("modifyId", mainProperty.id);
		window.location.href = "/" + locale;
	};

	return (
		<div className="main-info-block">
			<div className="top-block d-flex align-items-center justify-content-between">
				<h1 className="h4">{mainProperty?.search_address}</h1>
				<span className="d-flex align-items-center" onClick={modifyProperty}>
					{t("link.modify")} <img src={arrowIcon} alt="arrowIcon" />
				</span>
			</div>
			<div className="bottom-block d-flex">
				<div className="image-block d-flex">
					<img src={squareIcon} alt="squareIcon" />
					<div className="image-block__info d-flex flex-column">
						<span className="title">{t("title.square")}</span>
						<span className="desc">{mainProperty?.live_area}m²</span>
					</div>
				</div>
				<div className="image-block d-flex">
					<img src={bedsIcon} alt="bedsIcon" />
					<div className="image-block__info d-flex flex-column">
						<span className="title">{t("title.beds")}</span>
						<span className="desc">{mainProperty?.bedrooms}</span>
					</div>
				</div>
				<div className="image-block d-flex">
					<img src={bathIcon} alt="bathIcon" />
					<div className="image-block__info d-flex flex-column">
						<span className="title">{t("title.baths")}</span>
						<span className="desc">{mainProperty?.bathrooms}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainInfoBlock;
