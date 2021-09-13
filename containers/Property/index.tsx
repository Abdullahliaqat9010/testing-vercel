import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Image } from "react-bootstrap";

import { setActivePropertyFromMapAction } from "../../actions";

import { PropertyContainerProps } from "../../types/properties";
import ArrowImage from "../../assets/images/arrow-blue.svg";
import NoImage from "../../assets/images/no-image-available.svg";
import NoImageFr from "../../assets/images/no-image-available-fr.svg";

import { agentsList } from "../../templates/agentsList";
import { RootState } from "../../types/state";

const PropertyContainer = ({
	property,
	active,
	onClickProperty,
}: PropertyContainerProps) => {
	const { t } = useTranslation("dashboard-page");
	const router = useRouter();
	const { locale } = router;

	const dispatch = useDispatch();

	// React.useEffect(() => {
	// 	console.log(property);
	// }, []);

	const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 },
		{ label: "day", seconds: 86400 },
		{ label: "hour", seconds: 3600 },
		{ label: "minute", seconds: 60 },
		{ label: "second", seconds: 0 },
	];

	const [currentAgency] = agentsList.filter(
		(agency) => agency.tag === property.company_name
	);

	const timeSince = (date) => {
		const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
		const interval = intervals.find((i) => i.seconds < seconds);
		const count = Math.floor(seconds / interval.seconds);

		if (interval.label === "year" && locale === "fr") {
			return `${count} ${t(`span.${interval.label}`)} ${t("sold.ago")}${
				count !== 1 ? "s" : ""
			}`;
		}
		if (interval.label === "month" && locale === "fr") {
			return `${count} ${t(`span.${interval.label}`)} ${t("sold.ago")}`;
		}
		return `${count} ${t(`span.${interval.label}`)}${
			count !== 1 ? "s" : ""
		} ${t("sold.ago")}`;
	};

	const getImageLink = () => {
		if (property.images.length) {
			return property.images[0].url_small;
		}
		return locale === "fr" ? NoImageFr : NoImage;
	};

	return (
		<div
			style={{ cursor: "pointer" }}
			onClick={() => onClickProperty(property.id)}
			className={`property-block d-flex ${active ? "active-block" : ""}`}
		>
			<div className="property-block__image">
				<Image src={getImageLink()} rounded />
			</div>
			<div className="property-block__info">
				<div className="address">
					{property.street} {property.zip} {property.locality}
				</div>
				<div className="short-desc">
					<div className="time">
						<span>
							{t("desc.sold")} {timeSince(new Date(property.sold_date))}{" "}
						</span>
						{property.company_name && (
							<Link href={`/agency/${currentAgency?.url}`} locale={locale}>
								{property.company_name}
							</Link>
						)}
					</div>
					<div className="house-info">
						<span>{property.live_area}m²</span>
						<span>{property.bathrooms} Baths</span>
						<span>{property.bedrooms} Beds</span>
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
