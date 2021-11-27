import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import GoogleMap from "../../../../components/GoogleMap";
import PropertyBlock from "../../../../containers/Property";

//import LoadMoreImage from "../../../../assets/images/load-more.svg";
import NoEstimationImage from "../../../../assets/images/no-estimation.svg";
import { CustomScrollbar } from "../../../../components/Scrollbar";
import Mapbox3dMap from "../../../../components/3dMap";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

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
`;

const SimilarPropertiesBlock = styled.div`
	h3 {
		font-family: var(--fontNunitoBold);
		line-height: 27px;
		margin: 20px 0 10px 0px;
	}

	p {
		font-size: 14px;
		line-height: 19px;
		margin-bottom: 24px;
	}

	width: 50%;
	/* height: 800px; */
	padding: 10px;

	@media (max-width: 770px) {
		width: 100%;
		/* height: 300px; */
	}
`;

const MapContainer = styled.div`
	position: relative;
	width: 50%;
	height: 800px;
	padding: 10px;

	@media (max-width: 770px) {
		width: 100%;
		height: 300px;
	}
	@media (max-width: 425px) {
		display: none;
	}
`;

const PropertiesMainBlock = styled.div`
	margin-bottom: 20px;
	background: var(--colorWhite);
	border-radius: 10px;
`;

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
		height: calc(100% - 155px);
	`;

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
		<PropertiesMainBlock className="d-flex flex-column flex-lg-row">
			{similarProperties.length > 0 ? (
				<>
					<MapContainer>
						{mainProperty &&
							mainProperty.property.lng &&
							mainProperty.property.lat && (
								<Mapbox3dMap {...mapProps} />
								// <GoogleMap {...mapProps} />
							)}
					</MapContainer>
					<SimilarPropertiesBlock>
						<div>
							<h3 className="h5">{t("title.similar-sold-properties")}</h3>
							<p>
								{t("desc.we-found")} {totalSimilarProperties}{" "}
								{t("desc.similar-sold-properties")}
							</p>
						</div>
						<PropertiesContainer>
							<div style={{ height: "100%" }}>
								<CustomScrollbar style={{ minHeight: 330 }} autoHide={false}>
									{similarProperties.map((item, index) => (
										<PropertyBlock
											active={item?.id === activeMarker}
											onClickProperty={onClickProperty}
											key={index}
											property={item}
										/>
									))}
								</CustomScrollbar>
							</div>
						</PropertiesContainer>
						{isLoadMoreAvailable && (
							<div className="d-flex flex-row w-100 justify-content-center pt-3 ">
								<Button
									loading={isLoadingMore}
									icon={<SyncOutlined />}
									block
									size="large"
									onClick={onLoadMore}
									className="rounded-lg w-100 text-primary border-0"
									style={{ background: "#F2F6FF" }}
								>
									<span>{t('btn.load-more')}</span>
								</Button>
							</div>
						)}
					</SimilarPropertiesBlock>
				</>
			) : (
				<div className="d-flex flex-column">
					<h3
						style={{
							fontFamily: "var(--fontNunitoBold)",
							margin: "20px 10px 10px 20px",
						}}
					>
						{t("title.similar-sold-properties")}
					</h3>
					<NoPropertiesBlock className="mb-4">
						<img src={NoEstimationImage} alt="NoEstimationImage" />
						<span>{t("desc.no-items")}</span>
					</NoPropertiesBlock>
				</div>
			)}
		</PropertiesMainBlock>
	);
};

export default PropertiesBlock;
