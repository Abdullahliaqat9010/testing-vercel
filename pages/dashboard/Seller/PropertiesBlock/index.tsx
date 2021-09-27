import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { isMobileOnly } from "react-device-detect";

import GoogleMap from "../../../../components/GoogleMap";
import PropertyBlock from "../../../../containers/Property";

//import LoadMoreImage from "../../../../assets/images/load-more.svg";
import NoEstimationImage from "../../../../assets/images/no-estimation.svg";
import { CustomScrollbar } from "../../../../components/Scrollbar";
import Mapbox3dMap from "../../../../components/3dMap";

const PropertiesBlock = ({ similarProperties = [], mainProperty }) => {
	const { t } = useTranslation("dashboard-page");
	// const elementsOnPage = isMobileOnly ? 3 : 6;
	// const [sizeArr, setSizeArr] = useState(elementsOnPage);

	// const properties = similarProperties.slice(0, sizeArr);

	// const loadMore = () => {
	// 	setSizeArr(sizeArr + elementsOnPage);
	// };

	const [activeMarker, setActiveMarker] = useState<string | number>("home");
	const [markers, setMarkers] = useState([
		{
			type: "home",
			position: {
				lat: mainProperty?.lat,
				lng: mainProperty?.lng,
			},
			id: "home",
		},
		...similarProperties.map((prop) => {
			return {
				type: "property",
				position: {
					lat: prop?.lat,
					lng: prop?.lng,
				},
				id: prop?.id,
			};
		}),
	]);

	const mapProps = {
		markers: [...markers],
		onActiveMarker: (id) => onClickProperty(id),
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
						lat: prop?.lat,
						lng: prop?.lng,
					},
					id: prop?.id,
				};
			}),
			{
				type: "home",
				position: {
					lat: mainProperty?.lat,
					lng: mainProperty?.lng,
				},
				id: "home",
			},
		]);
	};

	return (
		<div className="properties-block d-flex">
			{!isMobileOnly && (
				<div className="w-50 position-relative">
					{mainProperty && mainProperty.lng && mainProperty.lat && (
						<Mapbox3dMap {...mapProps} />
						// <GoogleMap {...mapProps} />
					)}
				</div>
			)}

			<div className="properties-list">
				<h3 className="h5">{t("title.similar-sold-properties")}</h3>
				<p>
					{t("desc.we-found")} {similarProperties.length}{" "}
					{t("desc.similar-sold-properties")}
				</p>
				<div className="property-main-block">
					{similarProperties.length > 0 ? (
						<>
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
							{/* {properties.length < similarProperties.length && (
								<Button className="load-more" onClick={loadMore}>
									<img src={LoadMoreImage} alt="LoadMoreImage" />
									{t("button.load-more")}
								</Button>
							)} */}
						</>
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
