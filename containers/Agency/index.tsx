import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { isMobile, isMobileOnly } from "react-device-detect";
import { useRouter } from "next/router";

import StarRatingComponent from "react-star-rating-component";
import { Button, Image } from "react-bootstrap";
import Link from "next/link";

import RatingStar from "../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../assets/images/rating/star.svg";
import ArrowImage from "../../assets/images/arrow-blue.svg";
import AgencyStarImage from "../../assets/images/star-blue.svg";
import noLogo from "../../assets/images/no-photo.png";
import noAgencyLogo from "../../assets/images/no-image-available.svg";

import { RootState } from "../../types/state";
import { AgencyProps } from "../../types/agents";

import GoogleMap from "../../components/GoogleMap";
import ContactAgentModal from "../Modals/ContactAgentModal";

// import { parseJwt } from '../../utils';

const Agency = ({ nearest, agency, mainProperty, properties }: AgencyProps) => {
	const router = useRouter();
	const { locale } = router;
	const { t } = useTranslation("dashboard-page");

	const [showContactModal, setShowContactModal] = useState<boolean>(false);
	const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

	const openMoreInfo = () => {
		setShowMoreInfo(!showMoreInfo);
	};

	const openContactModal = () => {
		setShowContactModal(true);
	};

	const agencyRating = (rate) => {
		if (rate) {
			return rate.toString().length > 1 ? rate : rate + ".0";
		}
		return "5.0";
	};

	const agencyTotalUserReview = (reviews) => {
		if (reviews) {
			return reviews;
		}
		return 120;
	};

	const agencyDesc = (
		countProperties: string | undefined,
		similarProperties: any[] | undefined
	) => {
		if (locale === "en") {
			if (similarProperties) {
				return {
					__html: `During the last 24 months, our agency has sold 
                   <span class="bold">${
											agency?.properties?.length || 0
										} properties</span> nearby including <span class="bold">
                   ${
											agency?.properties?.length
										} similar to yours</span>. Our team is at your disposal to manage your 
                   project`,
				};
			}
			return {
				__html: `During the last 24 months, our agency has sold 
                 <span class="bold">${
										agency?.properties?.length || 0
									} properties</span> nearby. Our team is at your disposal 
                 to manage your project`,
			};
		}

		if (locale === "fr") {
			if (Number(agency?.properties?.length) === 1) {
				return {
					__html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                 <span class="bold">${
										agency?.properties?.length || 0
									} bien</span> à proximité. Nous sommes à votre disposition 
                 pour gérer votre projet immobilier`,
				};
			}

			if (similarProperties) {
				return {
					__html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                   <span class="bold">${
											agency?.properties?.length || 0
										} biens</span> à proximité dont <span class="bold">
                   ${agency?.properties?.length || 0} similaire${
						similarProperties.length !== 1 ? "s" : ""
					} au vôtre</span>. 
                   Nous sommes à votre disposition pour gérer votre projet immobilier`,
				};
			}

			return {
				__html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                 <span class="bold">${
										countProperties || 0
									} biens</span> à proximité. Nous sommes à votre disposition 
                 pour gérer votre projet immobilier`,
			};
		}
		if (locale === "nl") {
			if (Number(agency?.properties?.length) === 1) {
				return {
					__html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                 <span class="bold">${
										agency?.properties?.length || 0
									} bien</span> om uw vastgoedproject te beheren`,
				};
			}

			if (similarProperties) {
				return {
					__html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                   <span class="bold">${
											agency?.properties?.length || 0
										} biens</span> in de buurt inclusief
										<span class="bold">
                   ${agency?.properties?.length || 0} vergelijkbaar
				   ${similarProperties.length !== 1 ? "s" : ""} naar de jouwe</span>. 
                   Wij staan ​​tot uw beschikking om uw vastgoedproject te beheren`,
				};
			}

			return {
				__html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                 <span class="bold">${
										agency?.properties?.length || 0
									} biens</span> in de buurt. Wij staan ​​tot uw beschikking
                 om uw vastgoedproject te beheren`,
			};
		}
		return {
			__html: "",
		};
	};

	const agenciesList = agency.properties
		? [
				...agency?.properties?.map((prop) => {
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
		: [];

	const mapProps = {
		markers: [
			{
				type: "agency",
				position: {
					lat: agency?.latlng.split(",")[0],
					lng: agency?.latlng.split(",")[1],
				},
				id: agency.id,
			},
			{
				type: "home",
				position: {
					lat: mainProperty?.property?.lat,
					lng: mainProperty?.property?.lng,
				},
				id: "home",
			},
			...agenciesList,
		],
	};

	return (
		<div className="agency-block">
			<ContactAgentModal
				show={showContactModal}
				onClose={() => setShowContactModal(false)}
				properties={properties}
				agencyOwner={agency?.agent?.user}
				agencyName={agency?.company_name}
			/>
			<div
				className="short-info d-flex align-items-center"
				onClick={openMoreInfo}
			>
				<div className="short-info__left d-flex align-items-center w-55">
					<div className="logo-block">
						<img
							style={{ width: "100%", height: "100%", objectFit: "cover" }}
							src={agency?.logo_image ? agency?.logo_image : noAgencyLogo}
							alt={agency?.company_name}
						/>
					</div>
					<div className="info">
						<span className="agency-name">{agency.company_name}</span>
						<div className="rating-block d-flex align-items-center">
							<span className="total">
								{agencyRating(agency?.rating?.rating)}
							</span>
							<StarRatingComponent
								name="rate"
								className="custom-rate"
								renderStarIcon={(index, value) => (
									<img
										className="rating-star"
										src={index <= value ? RatingStar : RatingStarEmpty}
										alt="RatingStar"
									/>
								)}
								starCount={5}
								value={Number(agencyRating(agency?.rating?.rating))}
							/>
							<span className="from">
								{t("span.from")}{" "}
								{agencyTotalUserReview(
									agencyRating(agency?.rating?.user_ratings_total)
								)}{" "}
								{t("span.reviews")}
							</span>
						</div>
						{agency.id === nearest && (
							<span className="nearest">{t("span.nearest-agency")}</span>
						)}
					</div>
				</div>
				{/* <div className="agency-border" /> */}
				<div className="short-info__right d-flex align-items-center w-45">
					<span className="count-block pl-1">
						{agency.properties?.length || 0}
					</span>
					<div className="address">
						<p>{t("p.similar-properties-sold")}</p>
						<p className="d-flex">
							{t("p.to")}
							<span className="address__bold">
								{mainProperty?.search_address}
							</span>
						</p>
					</div>
				</div>
				<span className={`action-btn ${showMoreInfo ? " open" : ""}`} />
			</div>
			{showMoreInfo && (
				<div className="more-info d-flex justify-content-between">
					<div className="agent-block">
						<div className="agent-info d-flex">
							<Image
								src={
									agency?.agent?.user?.avatar
										? agency?.agent?.user?.avatar
										: noLogo
								}
								roundedCircle
							/>
							<div className="d-flex flex-column">
								<span className="bold">
									{agency?.agent?.user?.firstname}{" "}
									{agency?.agent?.user?.lastname}
								</span>
								<span>{t("button.agency-owner")}</span>
							</div>
						</div>
						<div
							className="desc"
							dangerouslySetInnerHTML={agencyDesc(
								"10",
								agency?.properties?.length
							)}
						></div>
						<Button className="contact" onClick={() => openContactModal()}>
							{t("button.contact")} {agency?.agent?.user?.firstname}
						</Button>
						<Link href={`/agency/${agency.id}`} locale={locale}>
							<span className="details">
								{t("button.agency-details")}{" "}
								<img src={ArrowImage} alt="ArrowImage" />
							</span>
						</Link>
					</div>
					{!isMobileOnly && (
						<div className="map-block d-flex flex-column">
							<div className="agency-map position-relative">
								{/*@ts-ignore*/}
								<GoogleMap {...mapProps} />
							</div>
							<div className="agency-map__info d-flex justify-content-between">
								<div className="your-property d-flex align-items-center">
									<div className="orange-circle" />
									<span>{t("span.your-property")}</span>
								</div>
								<div className="similar-property d-flex align-items-center">
									<div className="blue-circle" />
									<span>{t("span.similar-property")}</span>
								</div>
								<div className="other-property d-flex align-items-center">
									<img src={AgencyStarImage} alt="AgencyStarImage" />
									<span>{t("span.agency")}</span>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Agency;
