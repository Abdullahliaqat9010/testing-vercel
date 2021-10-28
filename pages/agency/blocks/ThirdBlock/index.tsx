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

const ThirdBlock = ({ currentAgency }: { currentAgency: any }) => {
	const { t } = useTranslation("agency-page");

	const [properties] = useState(
		currentAgency?.properties ? [...currentAgency?.properties] : []
	);
	const [activeMarker, setActiveMarker] = useState<number>(
		properties?.length > 0 ? properties[0]?.id : 0
	);
	const [markers, setMarkers] = useState([
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
	]);

	// const loadMore = () => {
	// 	setSizeArr(sizeArr + elementsOnPage);
	// };

	const mapProps = {
		markers: [...markers],
		onActiveMarker: (id) => onClickProperty(id),
	};

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
			<div className="main-content">
				<h3>{t("h3.sold-properties")}</h3>
				<p> {t("p.by") + " " + currentAgency?.company_name}</p>
				<div className="properties-list">
					{!isMobileOnly && (
						<div className="left-block position-relative">
							<GoogleMap {...mapProps} />
						</div>
					)}
					<div className="right-block">
						<CustomScrollbar>
							<div className="property-main-block">
								{properties.map((item, index) => {
									return (
										<PropertyBlock
											key={index}
											property={{ ...item }}
											active={item?.id === activeMarker}
											onClickProperty={onClickProperty}
										/>
									);
								})}
							</div>
						</CustomScrollbar>
						{/* <Button className="load-more" onClick={loadMore}>
							<img src={LoadMoreImage} alt="LoadMoreImage" />
							{t("button.learn-more")}
						</Button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThirdBlock;
