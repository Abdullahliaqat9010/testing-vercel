import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { isMobileOnly } from "react-device-detect";
import styled from "styled-components"
import GoogleMap from "../../../../components/GoogleMap";
import PropertyBlock from "../../../../containers/Property";

//import LoadMoreImage from "../../../../assets/images/load-more.svg";
import NoEstimationImage from "../../../../assets/images/no-estimation.svg";
import { CustomScrollbar } from "../../../../components/Scrollbar";
import Mapbox3dMap from "../../../../components/3dMap";
import { Button } from "antd";

const NoPropertiesBlock = styled.div`
	background: var(--bg-blue);
	font-size: 14px;
	line-height: 19px;
	border-radius: 8px;
	padding: 20px;
	margin: 0 20px;
	max-width: 450px;
	display: flex;
	align-items: self-start;
	img {
		margin-right: 10px;
	}

	span {
		color: var(--colorGrayTwo);
	}

`



const SimilarPropertiesBlock = styled.div`
h3 {
	font-family: var(--fontNunitoBold);
	line-height: 27px;
	margin: 20px 0 10px 20px;
}

p {
	font-size: 14px;
	line-height: 19px;
	margin: 0 0 24px 20px;
}

@media (min-width: 769px) { 
	width:50%;
}@media (max-width: 768px) { 
	width:100%;
}

`

const PropertiesMainBlock = styled.div`
margin-bottom: 20px;
background: var(--colorWhite);
border-radius: 10px;
@media (min-width: 769px) { 
	padding: 20px 0 20px 20px;

}@media (max-width: 768px) { 
	position: relative;
	padding: 20px;
	flex-direction: column;
}

`


const PropertiesBlock = ({
	similarProperties = [],
	mainProperty,
	totalSimilarProperties,
	onLoadMore = () => null,
	isLoadingMore = false,
	isLoadMoreAvailable = false,
}) => {
	const { t } = useTranslation("dashboard-page");
	const dummyData = [
		{
		   "id":2,
		   "leadId":1,
		   "interest":"asap",
		   "selling_way":null,
		   "residence_type":"other",
		   "is_owner":true,
		   "createdAt":"2021-10-28T03:15:07.009Z",
		   "updatedAt":"2021-10-28T03:15:07.009Z",
		   "property":{
			  "id":20796,
			  "search_address":"Rue De Fromenteau, Welkenraedt, 4840 Liège, Belgium",
			  "lat":"50.6631515",
			  "lng":"5.9627477",
			  "location":null,
			  "country":"Belgium",
			  "street":"Rue De Fromenteau",
			  "street_number":"2",
			  "box_number":null,
			  "zip":"4840",
			  "locality":"Welkenraedt",
			  "property_type":"apartment",
			  "live_area":233,
			  "total_area":null,
			  "area_unit":"m2",
			  "bedrooms":1,
			  "bathrooms":1,
			  "floor":1,
			  "levels":1,
			  "prestige":"basic",
			  "facades":2,
			  "construction_year":null,
			  "renov_year":null,
			  "renov_level":null,
			  "epc":null,
			  "view":"normal",
			  "orientation_terras":"N",
			  "terras_size":400,
			  "garden_size":null,
			  "attic":null,
			  "cellar":null,
			  "elevator":false,
			  "pool":false,
			  "indoor_garage":null,
			  "outdoor_garage":null,
			  "carport":null,
			  "solar_panels":0,
			  "state":"renovate",
			  "construction_price":null,
			  "display_address":null,
			  "energy_class":null,
			  "energy_value":null,
			  "evaluation":null,
			  "furnished":null,
			  "garage":null,
			  "garden":null,
			  "garden_area":null,
			  "min_area":null,
			  "max_area":null,
			  "name":null,
			  "parking":null,
			  "sub_category":null,
			  "terrace":null
		   }
		},
		{
		   "id":3,
		   "leadId":1,
		   "interest":"asap",
		   "selling_way":null,
		   "residence_type":"other",
		   "is_owner":true,
		   "createdAt":"2021-10-28T03:17:16.346Z",
		   "updatedAt":"2021-10-28T03:17:16.346Z",
		   "property":{
			  "id":20797,
			  "search_address":"Rue De Fromenteau, Welkenraedt, 4840 Liège, Belgium",
			  "lat":"50.6631515",
			  "lng":"5.9627477",
			  "location":null,
			  "country":"Belgium",
			  "street":"Rue De Fromenteau",
			  "street_number":"2",
			  "box_number":null,
			  "zip":"4840",
			  "locality":"Welkenraedt",
			  "property_type":"apartment",
			  "live_area":233,
			  "total_area":null,
			  "area_unit":"m2",
			  "bedrooms":1,
			  "bathrooms":1,
			  "floor":1,
			  "levels":1,
			  "prestige":"basic",
			  "facades":2,
			  "construction_year":null,
			  "renov_year":null,
			  "renov_level":null,
			  "epc":null,
			  "view":"normal",
			  "orientation_terras":"N",
			  "terras_size":400,
			  "garden_size":null,
			  "attic":null,
			  "cellar":null,
			  "elevator":false,
			  "pool":false,
			  "indoor_garage":null,
			  "outdoor_garage":null,
			  "carport":null,
			  "solar_panels":0,
			  "state":"renovate",
			  "construction_price":null,
			  "display_address":null,
			  "energy_class":null,
			  "energy_value":null,
			  "evaluation":null,
			  "furnished":null,
			  "garage":null,
			  "garden":null,
			  "garden_area":null,
			  "min_area":null,
			  "max_area":null,
			  "name":null,
			  "parking":null,
			  "sub_category":null,
			  "terrace":null
		   }
		}
	 ]
	
	const PropertiesContainer = styled.div`
	position: relative;
	// overflow-x: auto;
	padding-bottom: 5px;
	@media (max-width: 768px) { 
		width:100%;
		margin-top: 50px;
	}
	@media (max-width: 500px) { 
		width:100%;
		height: auto;
		margin-top: 0px;
	}
	` 
	// const elementsOnPage = isMobileOnly ? 3 : 6;
	// const [sizeArr, setSizeArr] = useState(elementsOnPage);

	// const properties = similarProperties.slice(0, sizeArr);

	// const loadMore = () => {
	// 	setSizeArr(sizeArr + elementsOnPage);
	// };

	const [activeMarker, setActiveMarker] = useState<string | number>("home");
	const [markers, setMarkers] = useState([]);

	const mapProps = {
		markers: [...markers],
		is3d: false,
		onActiveMarker: (id) => onClickProperty(id),
		zoom: 11,
	};

	const onClickProperty = (propertyId) => {
		setActiveMarker(propertyId);
		if (propertyId === "home") {
			return;
		}
		const properties = [
			similarProperties.find(({ id }) => id === propertyId),
			...similarProperties.filter(({ id }) => id !== propertyId),
		];
		setMarkers([
			...properties.map((prop, index) => {
				return {
					type: `${index === 0 ? "property-active" : "property"}`,
					position: {
						lat: prop?.property?.lat,
						lng: prop?.property?.lng,
					},
					id: prop?.id,
				};
			}),
			{
				type: "home",
				position: {
					lat: mainProperty?.property?.lat,
					lng: mainProperty?.property?.lng,
				},
				id: "home",
			},
		]);
	};

	useEffect(() => {
		setMarkers([
			...similarProperties.map((prop) => {
				return {
					type: "property",
					position: {
						lat: prop?.property?.lat,
						lng: prop?.property?.lng,
					},
					id: prop?.id,
				};
			}),
			{
				type: "home",
				position: {
					lat: mainProperty?.property?.lat,
					lng: mainProperty?.property?.lng,
				},
				id: "home",
			},
		]);
	}, [similarProperties]);

	return (
		<PropertiesMainBlock className="d-flex">
			

			<SimilarPropertiesBlock >
				<h3 className="h5">{t("title.similar-sold-properties")}</h3>
				<p>
					{t("desc.we-found")} {totalSimilarProperties}{" "}
					{t("desc.similar-sold-properties")}
				</p>
				<PropertiesContainer>
					{similarProperties.length > 0 ? (
						<div>
							<CustomScrollbar autoHide={false} >
								{similarProperties.map((item, index) => (
									<PropertyBlock
										active={item?.id === activeMarker}
										onClickProperty={onClickProperty}
										key={index}
										property={item}
									/>
								))}
							</CustomScrollbar>
							{isLoadMoreAvailable && (
								<div className="d-flex flex-row w-100 justify-content-center pt-3">
									<Button
										loading={isLoadingMore}
										onClick={onLoadMore}
										className="rounded-lg"
									>
										Load More
									</Button>
								</div>
							)}
						</div>
					) : (
						<NoPropertiesBlock >
							<img src={NoEstimationImage} alt="NoEstimationImage" />
							<span >{t("desc.no-items")}</span>
						</NoPropertiesBlock>
					)}
				</PropertiesContainer>
			</SimilarPropertiesBlock>
			{!isMobileOnly && (
				<div className="w-50 position-relative">
					{mainProperty &&
						mainProperty.property.lng &&
						mainProperty.property.lat && (
							<Mapbox3dMap {...mapProps} />
							// <GoogleMap {...mapProps} />
						)}
				</div>
			)}
		</PropertiesMainBlock>
	);
};

export default PropertiesBlock;
