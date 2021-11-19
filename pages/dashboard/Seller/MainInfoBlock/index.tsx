import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import styled from "styled-components"
import { RootState } from "../../../../types/state";

import arrowIcon from "../../../../assets/images/arrow-blue.svg";
import squareIcon from "../../../../assets/images/square.svg";
import bedsIcon from "../../../../assets/images/beds.svg";
import bathIcon from "../../../../assets/images/bath.svg";

const ContectBlock = styled.div`
margin-left: 12px;
`
const TitleDiv = styled.span`
	font-size: 12px;
  	line-height: 16px;
  	opacity: 0.7;
`

const ImageBlock = styled.div`
@media (min-width: 501px) {
	margin-right: 30px;
}
@media (max-width: 500px) {
	margin-right: 10px;
}
`

const AddressBiv = styled.h4`
	font-family: var(--fontNunitoBold);
	line-height: 33px;

`

const MainPropertyBlock = styled.div`
	margin-bottom: 20px;
	width: 100%;
	background: var(--colorWhite);
	border-radius: 10px;
	@media (min-width: 769px) {
		padding: 30px;

	}
	@media (max-width: 768px) {
		padding: 20px;

	}
`

const MainInfoBlock = ({ mainProperty }) => {
	const router = useRouter();
	const { locale } = router;
	const { t } = useTranslation("dashboard-page");

	// const modifyProperty = () => {
	// 	const propertyObjectForModify = {
	// 		mainBlocks: true,
	// 		stepBlock: {
	// 			step: 0,
	// 			addressFromStepOne: mainProperty.search_address,
	// 			additionalAddress: {
	// 				street: mainProperty.street,
	// 				number: mainProperty.street_number,
	// 				zip: mainProperty.zip,
	// 				locality: mainProperty.locality,
	// 				country: mainProperty.country,
	// 			},
	// 			selectedProperty: mainProperty.property_type,
	// 			propertyDetails: {
	// 				livingArea: mainProperty.live_area,
	// 				landSurface: mainProperty.total_area,
	// 				facadesNumber: mainProperty.facades,
	// 				numberBedrooms: mainProperty.bedrooms,
	// 				numberBathrooms: mainProperty.bathrooms,
	// 				numberLevels: mainProperty.floor,
	// 				numberFloors: mainProperty.levels,
	// 				gardenTerrasValue: mainProperty.terras_size,
	// 				elevator: mainProperty.elevator,
	// 			},
	// 			details: {
	// 				prestige: mainProperty.prestige,
	// 				condition: mainProperty.state,
	// 				constructionYear: mainProperty.construction_year || "",
	// 				renovationYear: mainProperty.renov_year || "",
	// 				renovationLevel: mainProperty.renov_level || "0",
	// 			},
	// 			utilities: {
	// 				epc: mainProperty.epc || "",
	// 				view: mainProperty.view,
	// 				orientation: mainProperty.orientation_terras,
	// 				atticValue: mainProperty.attic || "",
	// 				cellarValue: mainProperty.cellar || "",
	// 				elevator: mainProperty.elevator,
	// 				swimmingPool: mainProperty.pool,
	// 				indoorGarage: mainProperty.indoor_garage,
	// 				outdoorGarage: mainProperty.outdoor_garage,
	// 				carport: mainProperty.carport,
	// 				parking:
	// 					mainProperty.carport ||
	// 					mainProperty.outdoor_garage ||
	// 					mainProperty.indoor_garage,
	// 				solarPanels: mainProperty.solar_panels,
	// 			},
	// 			personalAccount: {
	// 				// accountType: 'private',
	// 				// selectedItem: '',
	// 				selectedResidence: mainProperty.residence_type,
	// 				sellProperty: mainProperty.interest,
	// 				howSell: mainProperty.selling_way || "",
	// 			},
	// 			location: {
	// 				lat: mainProperty.lat,
	// 				lng: mainProperty.lng,
	// 			},
	// 		},
	// 	};
	// 	window.sessionStorage.setItem(
	// 		"modify",
	// 		JSON.stringify(propertyObjectForModify)
	// 	);
	// 	window.sessionStorage.setItem("modifyId", mainProperty.id);
	// 	window.location.href = "/" + locale;
	// };

	return (
		<MainPropertyBlock>
			<div className=" d-flex align-items-center justify-content-between">
				<AddressBiv >{mainProperty?.search_address}</AddressBiv>
				{/* <span className="d-flex align-items-center" onClick={modifyProperty}>
					{t("link.modify")} <img src={arrowIcon} alt="arrowIcon" />
				</span> */}
			</div>
			<div className="d-flex">
				<ImageBlock className=" d-flex">
					<img src={squareIcon} alt="squareIcon" />
					<ContectBlock className=" d-flex flex-column">
						<TitleDiv>{t("title.square")}</TitleDiv>
						<span style={{ fontSize: "14px" }}>{mainProperty?.live_area}m²</span>
					</ContectBlock>
				</ImageBlock>
				<ImageBlock className=" d-flex">
					<img src={bedsIcon} alt="bedsIcon" />
					<ContectBlock className=" d-flex flex-column">
						<TitleDiv>{t("title.beds")}</TitleDiv>
						<span style={{ fontSize: "14px" }}>{mainProperty?.bedrooms}</span>
					</ContectBlock>
				</ImageBlock>
				<ImageBlock className=" d-flex">
					<img src={bathIcon} alt="bathIcon" />
					<ContectBlock className=" d-flex flex-column">
						<TitleDiv>{t("title.baths")}</TitleDiv>
						<span style={{ fontSize: "14px" }}>{mainProperty?.bathrooms}</span>
					</ContectBlock>
				</ImageBlock>
			</div>
		</MainPropertyBlock>
	);
};

export default MainInfoBlock;
