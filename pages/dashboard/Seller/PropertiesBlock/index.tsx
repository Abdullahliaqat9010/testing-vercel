import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { isMobileOnly } from "react-device-detect";

import GoogleMap from "../../../../components/GoogleMap";
import PropertyBlock from "../../../../containers/Property";

//import LoadMoreImage from "../../../../assets/images/load-more.svg";
import NoEstimationImage from "../../../../assets/images/no-estimation.svg";
import { CustomScrollbar } from "../../../../components/Scrollbar";
import Mapbox3dMap from "../../../../components/3dMap";
import { Button } from "antd";

const PropertiesBlock = ({
	similarProperties = [],
	mainProperty,
	totalSimilarProperties,
	onLoadMore = () => null,
	isLoadingMore = false,
	isLoadMoreAvailable = false,
}) => {
	const { t } = useTranslation("dashboard-page");
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
		<div className="properties-block d-flex">
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

			<div className="properties-list">
				<h3 className="h5">{t("title.similar-sold-properties")}</h3>
				<p>
					{t("desc.we-found")} {totalSimilarProperties}{" "}
					{t("desc.similar-sold-properties")}
				</p>
				<div className="property-main-block">
					{similarProperties.length > 0 ? (
						<div>
							<CustomScrollbar autoHide={false}>
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
						<div className="property-main-block__no-items">
							<img src={NoEstimationImage} alt="NoEstimationImage" />
							<span className="property-description">{t("desc.no-items")}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PropertiesBlock;
