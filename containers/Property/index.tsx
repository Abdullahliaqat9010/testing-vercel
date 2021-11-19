import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { Image } from "antd";
import moment from "moment";
import styled from "styled-components"
import { PropertyContainerProps } from "../../types/properties";
import ArrowImage from "../../assets/images/arrow-blue.svg";
import NoImage from "../../assets/images/no-image-available.svg";
import NoImageFr from "../../assets/images/no-image-available-fr.svg";

const TimeBlock = styled.div`
margin-bottom: 10px;
display: flex;
flex-direction: column;

span {
	opacity: 0.6;
	font-size: 12px;
	line-height: 16px;
}

a {
	font-family: var(--fontNunitoBold);
	text-transform: capitalize;
	color: var(--colorBlue);
	font-size: 14px;
line-height: 19px;
}
`

const AddressBlock = styled.div`
color: #1D2E5B;
@media (min-width: 501px) {
	font-size: 14px;
line-height: 19px;
}
@media (max-width: 500px) {
	font-size: 12px;
	line-height: 16px;
	margin-top:10px;
}
`

const HouseInfo = styled.div`
margin-bottom: 10px;
span {
	font-size: 12px;
	line-height: 16px;
	padding: 4px 8px;
	background: var(--bg-blue);
	border-radius: 8px;
	margin-right: 6px;
}
`
const ProperyImage = styled.div`
margin-right: 20px;

display:flex;
@media (min-width: 501px) {

	img {
		width: 140px;
		height: 140px;
	}
}
@media (max-width: 500px) {
	justify-content: center;
	img {
		width: 100%;
	}
}
`

const PropertyMainBlock = styled.div`
// margin: 0 20px 6px;
// padding: 30px ;
border-bottom: 1px solid rgba(56, 113, 239, 0.2);
Button {
	font-size: 12px;
	line-height: 16px
}
@media (max-width: 500px) { 
	flex-direction: column;
	Button {
		width:100%;
	}
}

`

const PropertyContainer = ({
	property,
	active,
	onClickProperty = (id) => null,}: PropertyContainerProps) => {
	const { t } = useTranslation("dashboard-page");
	const router = useRouter();
	const { locale } = router;

	const getImageLink = () => {
		if (property?.images?.length) {
			return property.images[0];
		}
		return locale === "fr" ? NoImageFr : NoImage;
	};

	return (
		<PropertyMainBlock className={ `d-flex ${active ? "active-block" : ""}`}>
			<ProperyImage>
				<Image src={getImageLink()} preview={false} fallback={NoImage} />
			</ProperyImage>
			<div>
				<AddressBlock
					style={{ cursor: "pointer",  }}
					onClick={() => onClickProperty(property.id)}
					// className="address"
				>
					{property?.property?.search_address}
				</AddressBlock>
				<div>
					<TimeBlock>
						<span>
							{t("desc.sold")} {moment(property.sold_rent_date).fromNow()}{" "}
						</span>
						{property.agency?.company_name && (
							<Link href={`/agency/${property.agency?.id}`} locale={locale}>
								{property.agency?.company_name}
							</Link>
						)}
					</TimeBlock>
					<HouseInfo>
						{property?.property?.live_area && (
							<span>{`${property?.property?.live_area} m²`}</span>
						)}
						{property?.property?.bathrooms && (
							<span>
								{`${property?.property?.bathrooms} ${t("span.house-baths")}`}
							</span>
						)}
						{property?.property?.bedrooms && (
							<span>
								{`${property?.property?.bedrooms} ${t("span.house-beds")}`}
							</span>
						)}
					</HouseInfo>
				</div>
				<Link href={`/property/${property.id}`} locale={locale}>
					<Button variant="outline-primary">
						{t("button.request-price")}
						<img src={ArrowImage} alt="ArrowImage" />
					</Button>
				</Link>
			</div>
		</PropertyMainBlock>
	);
};

export default PropertyContainer;
