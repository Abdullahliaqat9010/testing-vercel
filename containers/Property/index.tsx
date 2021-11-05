import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { Image } from "antd";
import moment from "moment";

import { PropertyContainerProps } from "../../types/properties";
import ArrowImage from "../../assets/images/arrow-blue.svg";
import NoImage from "../../assets/images/no-image-available.svg";
import NoImageFr from "../../assets/images/no-image-available-fr.svg";

const PropertyContainer = ({
	property,
	active,
	onClickProperty = (id) => null,
}: PropertyContainerProps) => {
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
		<div className={`property-block d-flex ${active ? "active-block" : ""}`}>
			<div className="property-block__image">
				<Image src={getImageLink()} preview={false} fallback={NoImage} />
			</div>
			<div className="property-block__info">
				<div
					style={{ cursor: "pointer" }}
					onClick={() => onClickProperty(property.id)}
					className="address"
				>
					{property?.property?.search_address}
				</div>
				<div className="short-desc">
					<div className="time">
						<span>
							{t("desc.sold")} {moment(property.sold_rent_date).locale('nl').fromNow()}{" "}
						</span>
						{property.agency?.company_name && (
							<Link href={`/agency/${property.agency?.id}`} locale={locale}>
								{property.agency?.company_name}
							</Link>
						)}
					</div>
					<div className="house-info">
						<span>{property?.property?.live_area}m²</span>
						<span>{property?.property?.bathrooms}{t("span.house-baths")}</span>
						<span>{property?.property?.bedrooms} {t("span.house-beds")}</span>
					</div>
				</div>
				<Link href={`/property/${property.id}`} locale={locale}>
					<Button variant="outline-primary">
						{t("button.request-price")}
						<img src={ArrowImage} alt="ArrowImage" />
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default PropertyContainer;
