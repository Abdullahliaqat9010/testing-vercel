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
		min-height: ${similarProperties.length > 0 ?"62rem": "auto"} ;
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
		</PropertiesMainBlock>
	);
};

export default PropertiesBlock;
