import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { Button } from "react-bootstrap";

import GoogleMap from "../../../../components/GoogleMap";
import PropertyBlock from "../../../../containers/Property";

import { AgentsItem } from "../../../../types/agents";
import { RootState } from "../../../../types/state";

import LoadMoreImage from "../../../../assets/images/load-more.svg";
import { isMobileOnly } from "react-device-detect";
import { CustomScrollbar } from "../../../../components/Scrollbar";
import styled from "styled-components"

const PropertiesBlock = styled.div`
	width: 50%;
	/* height: 800px; */
	// padding: 10px;

	@media (max-width: 770px) {
		width: 100%;
		/* height: 300px; */
	}
`

const MapContainer = styled.div`
	position: relative;
	width: 50%;
	height: 800px;
	// padding: 10px;

	@media (max-width: 770px) {
		width: 100%;
		height: 300px;
	}
	@media (max-width: 425px) {
		display: none;
	}
`
const PropertiesMainBlock = styled.div`
@media (max-width: 770px) {
	flex-direction: column;
}
`

const PropertyMainContant = styled.div`
	border-radius: 10px;
	background-color: var(--colorWhite);
	margin-top: 20px;
  
		h3 {
		  font-family: var(--fontNunitoBold);
		  font-size: 20px;
		  line-height: 27px;
		  margin-bottom: 10px;
		}
  
		p {
		  font-size: 14px;
		  line-height: 19px;
		}
		@media (min-width: 769px) {
			padding: 30px;
		}
		@media (max-width: 768.99px) {
			padding: 10px 0px;
		}
		@media (max-width: 425px) {
			padding: 20px;

		}
`
const ThirdBlock = ({ currentAgency }: { currentAgency: any }) => {
	const { t } = useTranslation("agency-page");

	const [properties] = useState(
		currentAgency?.properties ? [...currentAgency?.properties] : []
	);
	const [activeMarker, setActiveMarker] = useState<number>(
		properties?.length > 0 ? properties[0]?.id : 0
	);
	const [markers, setMarkers] = useState(
		currentAgency?.latlng
			? [
					{
						type: "agency",
						position: {
							lat: currentAgency?.latlng.split(",")[0],
							lng: currentAgency?.latlng.split(",")[1],
						},
						id: currentAgency.id,
					},
					...properties.map((prop) => {
						return {
							type: "property",
							position: {
								lat: prop?.property?.lat,
								lng: prop?.property?.lng,
							},
							id: prop?.id,
						};
					}),
			  ]
			: [
					...properties.map((prop) => {
						return {
							type: "property",
							position: {
								lat: prop?.property?.lat,
								lng: prop?.property?.lng,
							},
							id: prop?.id,
						};
					}),
			  ]
	);

	// const loadMore = () => {
	// 	setSizeArr(sizeArr + elementsOnPage);
	// };

	const mapProps = {
		markers: [...markers],
		onActiveMarker: (id) => onClickProperty(id),
		zoom: 15,
	};

	console.log("ahs", properties)

	const onClickProperty = (propertyId) => {
		setActiveMarker(propertyId);
		const _properties = [
			properties.find(({ id }) => id === propertyId),
			...properties.filter(({ id }) => id !== propertyId),
		];
		setMarkers([
			..._properties.map((prop, index) => {
				return {
					type: `${index === 0 ? "property-active" : "property"}`,
					position: {
						lat: prop?.property?.lat,
						lng: prop?.property?.lng,
					},
					id: prop?.id,
				};
			}),
		]);
	};

	return (
		<div className="Agency__third-block">
			<PropertyMainContant>
				<h3>{t("h3.sold-properties")}</h3>
				<p> {t("p.by") + " " + currentAgency?.company_name}</p>
				<PropertiesMainBlock className="d-flex">
					{/* {!isMobileOnly && ( */}
						<MapContainer >
							{/* left-block */}
							<GoogleMap {...mapProps} />
						</MapContainer>
					{/* )} */}
					<PropertiesBlock >
					<div style={{ height: "100%" }}>
						<CustomScrollbar style={{ minHeight: 330 }} >
							{/* <div className="property-main-block"> */}
								{properties.map((item, index) => {
									return (
										<PropertyBlock
											key={index}
											property={{ ...item }}
											active={false}
											onClickProperty={onClickProperty}
										/>
									);
								})}
							{/* </div> */}
						</CustomScrollbar>
						</div>
						{/* <Button className="load-more" onClick={loadMore}>
							<img src={LoadMoreImage} alt="LoadMoreImage" />
							{t("button.learn-more")}
						</Button> */}
					</PropertiesBlock>
				</PropertiesMainBlock>
			</PropertyMainContant>
		</div>
	);
};

export default ThirdBlock;
