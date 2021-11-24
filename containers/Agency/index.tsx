import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { isMobile, isMobileOnly } from "react-device-detect";
import { useRouter } from "next/router";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

import StarRatingComponent from "react-star-rating-component";
import { Button, Image } from "react-bootstrap";
import Link from "next/link";

import RatingStar from "../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../assets/images/rating/star.svg";
import ArrowImage from "../../assets/images/arrow-blue.svg";
import AgencyStarImage from "../../assets/images/star-blue.svg";
import noLogo from "../../assets/images/no-photo.png";
import noAgencyLogo from "../../assets/images/no-image-available.svg";
import styled from "styled-components";
import { RootState } from "../../types/state";
import { AgencyProps } from "../../types/agents";

import GoogleMap from "../../components/GoogleMap";
import ContactAgentModal from "../Modals/ContactAgentModal";
import { spawn } from "child_process";

// import { parseJwt } from '../../utils';

const Circle = styled.div`
	width: 8px;
	height: 8px;
	border: 1px solid var(--colorWhite);
	border-radius: 10px;
	margin-right: 5px;
`;

const OrangeCircle = styled(Circle)`
	background: var(--colorOrange);
`;
const BlueCircle = styled(Circle)`
	background: var(--colorBlue);
`;

const AgencyInfoBlock = styled.div`
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: baseline !important;
	}
`;

const AgencyLeftBlock = styled.div`
	@media (min-width: 769px) {
		width: 55%;
	}

	@media (max-width: 768px) {
		align-items: flex-start !important;
		width: 100% !important;
	}
`;

const AgencyLogoBlock = styled.div`
	border: 1px solid var(--colorLightGrey);
	border-radius: 8px;
	@media (min-width: 769px) {
		height: 82px;
		width: 150px;
		margin: 20px 16px 20px 0px;
	}
	@media (max-width: 768px) {
		height: 126px;
		width: 150px;
		margin: 20px 16px 20px 0px;
	}
	@media (max-width: 500px) {
		height: 70px;
		width: 85px;
		margin: 20px 8px 20px 0px;
	}
`;
const AgencyName = styled.span`
	font-family: var(--fontNunitoBold);
	font-size: 20px;
	line-height: 27px;
	/* margin-bottom: 10px; */
`;
const AgentName = styled.span`
	font-family: var(--fontNunitoBold);
	font-size: 20px;
	line-height: 27px;
`;

const AgencyRightBlock = styled.div`
	@media (min-width: 769px) {
		/* margin: 12px 0 20px 10px; */
		width: 45%;
	}
	@media (max-width: 500px) {
		/* margin: 12px 0 20px 0px; */
		width: 100% !important;
	}
`;

const CountSoldProperties = styled.p`
	/* display: flex;
	align-items: center;
	justify-content: center; */
	// margin: 0 12px 0 20px;
	// margin-left: -2px;
	/* width: 42px;
	height: 42px; */
	background: var(--bg-blue);
	/* padding: 5px; */
	border-radius: 8px;
`;

const MainPropAddress = styled.span`
	margin-left: 4px;
	font-family: var(--fontNunitoBold);
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 70%;

	@media (min-width: 1024px) {
		width: 65%;
	}

	@media (min-width: 1440px) {
		width: 68%;
	}
`;

const OpenDetailBlock = styled.span`
	position: absolute;
	right: 0;
	cursor: pointer;
	background-image: url("../../assets/images/arrow.svg");
	width: 24px;
	height: 24px;
`;

const NearestLabel = styled.span`
	display: block;
	width: max-content;
	margin-top: 3px;
	background: var(--bg-blue);
	border-radius: 8px;
	font-size: 10px;
	line-height: 16px;
	padding: 4px 8px;
`;

// const MoreInfoBlock = styled.div`

// `;

const MoreInfoLeftBlock = styled.div`
	@media (min-width: 769px) {
		width: 50%;
	}
	@media (max-width: 768px) {
		width: 100% !important;
	}
`;
const MoreInfoMapBlock = styled.div`
	padding-left: 40px;
	width: 50%;
	@media (min-width: 768px) and (max-width: 1023px) {
		width: 100%;
		padding-left: 0px;
	}
`;

const LinksBlock = styled.div`
	Button {
		font-weight: bold;
		font-size: 16px;
		line-height: 22px;
		border-radius: 10px;
		margin-bottom: 10px;
		width: max-content;
		border-radius: 5px;
		font-size: 14px;
		@media (max-width: 425px) {
			width: 100%;
		}
	}
	span {
		font-size: 14px;
		line-height: 19px;
		color: var(--colorBlue);
		margin-bottom: 10px;
		@media (max-width: 425px) {
			width: 100%;
			text-align: center;
		}
		@media (min-width: 768px) and (max-width: 1023px) {
			margin-top: 10px;
			margin-left: 15px;
		}
	}
`;

const AgencyInfo = styled.div`
	font-size: 12px;
	line-height: 16px;
	@media (min-width: 501px) {
		margin-right: 10px;
	}
	@media (max-width: 500px) {
		margin-right: 0px;
	}
`;

const RatingStarImages = styled.img`
	@media (min-width: 501px) {
		height: 14px;
		width: 14px;
	}
	@media (max-width: 500px) {
		height: 14px;
		width: 14px;
	}
`;
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
					//   __html: `During the last 24 months, our agency has sold
					//            <span class="bold">${
					//              agency?.properties?.length || 0
					//            } properties</span> nearby including <span class="bold">
					//            ${
					//              agency?.properties?.length
					//            } similar to yours</span>. Our team is at your disposal to manage your
					//            project`,
					__html: `In the past 24 months, our office has sold   
		  <span class="font-weight-bold">  
		  ${agency?.properties?.length || 0} home${
						similarProperties.length !== 1 ? "s" : ""
					}</span> of which
<span class="font-weight-bold">				   
${agency?.properties?.length || 0} home${
						similarProperties.length !== 1 ? "s" : ""
					} </span> are similar to yours. 
 Our team is available to manage your real estate project. 
`,
				};
			}

			return {
				__html: `During the last 24 months, our agency has sold 
                 <span class="font-weight-bold">${
										agency?.properties?.length || 0
									} properties</span> nearby. Our team is at your disposal 
                 to manage your project`,
			};
		}

		if (locale === "fr") {
			if (Number(agency?.properties?.length) === 1) {
				return {
					__html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                 <span class="font-weight-bold">${
										agency?.properties?.length || 0
									} bien</span> à proximité. Nous sommes à votre disposition 
                 pour gérer votre projet immobilier`,
				};
			}

			if (similarProperties) {
				return {
					__html: `In de afgelopen 24 maanden heeft ons kantoor  
			<span class="font-weight-bold">  
			${agency?.properties?.length || 0} woning${
						similarProperties.length !== 1 ? "en" : ""
					}</span>  verkocht waarvan
  <span class="font-weight-bold">				   
  ${agency?.properties?.length || 0} woning${
						similarProperties.length !== 1 ? "en" : ""
					} </span> gelijkaardig aan die van u. 
			Ons team is beschikbaar om uw vastgoedproject te beheren. 
`,
				};
			}

			return {
				__html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                 <span class="font-weight-bold">${
										countProperties || 0
									} biens</span> à proximité. Nous sommes à votre disposition 
                 pour gérer votre projet immobilier`,
			};
		}
		if (locale === "nl") {
			if (Number(agency?.properties?.length) === 1) {
				return {
					__html: `In de afgelopen 24 maanden heeft ons bureau verkocht 
                 <span class="font-weight-bold">${
										agency?.properties?.length || 0
									} bien</span> om uw vastgoedproject te beheren`,
				};
			}

			if (similarProperties) {
				return {
					__html: `In de afgelopen 24 maanden heeft ons kantoor  
                   <span class="font-weight-bold">  
				   ${agency?.properties?.length || 0} woning${
						similarProperties.length !== 1 ? "en" : ""
					}</span>  verkocht waarvan
		 <span class="font-weight-bold">				   
		 ${agency?.properties?.length || 0} woning${
						similarProperties.length !== 1 ? "en" : ""
					} </span> gelijkaardig aan die van u. 
                   Ons team is beschikbaar om uw vastgoedproject te beheren. 
`,
				};
			}

			return {
				__html: `In de afgelopen 24 maanden heeft ons kantoor  
		<span class="font-weight-bold">  
		${agency?.properties?.length || 0} woning${
					similarProperties.length !== 1 ? "en" : ""
				}</span>  verkocht waarvan
<span class="font-weight-bold">				   
${agency?.properties?.length || 0} woning${
					similarProperties.length !== 1 ? "en" : ""
				} </span> gelijkaardig aan die van u. 
		Ons team is beschikbaar om uw vastgoedproject te beheren. 
`,
				// `In de afgelopen 24 maanden heeft ons bureau verkocht
				//          <span class="bold">${
				//            agency?.properties?.length || 0
				//          } biens</span> in de buurt. Wij staan ​​tot uw beschikking
				//          om uw vastgoedproject te beheren`,
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
		markers: agency?.latlng
			? [
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
			  ]
			: [
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
		zoom: 15,
	};

	return (
		<div
			style={{
				borderBottom: "1px solid rgba(56, 113, 239, 0.2)",
				paddingBottom: 10,
			}}
		>
			{/* className="agency-block" */}
			<ContactAgentModal
				show={showContactModal}
				onClose={() => setShowContactModal(false)}
				properties={properties}
				agencyOwner={agency?.agent?.user}
				agencyName={agency?.company_name}
				agencyId={agency?.id}
			/>
			<AgencyInfoBlock
				className="d-flex align-items-center"
				onClick={openMoreInfo}
			>
				<AgencyLeftBlock className="d-flex align-items-center">
					<AgencyLogoBlock>
						<img
							style={{
								width: "100%",
								height: "100%",
								objectFit: "contain",
							}}
							src={agency?.logo_image ? agency?.logo_image : noAgencyLogo}
							alt={agency?.company_name}
						/>
					</AgencyLogoBlock>
					<AgencyInfo className="my-3 w-100">
						<div className="d-flex flex-row w-100 justify-content-between align-items-center">
							<AgencyName> {agency.company_name}</AgencyName>
							<div className="d-flex d-lg-none pr-2">
								<UpOutlined rotate={showMoreInfo ? 180 : 0} />
							</div>
						</div>
						<div className="d-flex align-items-center flex-wrap">
							<span className="pb-1 pr-2" style={{ fontSize: "12px" }}>
								{agencyRating(agency?.rating?.rating)}
							</span>
							<StarRatingComponent
								name="rate"
								className="custom-rate mr-2"
								renderStarIcon={(index, value) => (
									<RatingStarImages
										className="mr-1"
										style={{ verticalAlign: "text-bottom" }}
										src={index <= value ? RatingStar : RatingStarEmpty}
										alt="RatingStar"
									/>
								)}
								starCount={5}
								value={Number(agencyRating(agency?.rating?.rating))}
							/>
							<span className="pb-2">
								{t("span.from")}{" "}
								{agencyTotalUserReview(
									agencyRating(agency?.rating?.user_ratings_total)
								)}{" "}
								{t("span.reviews")}
							</span>
						</div>
						{agency.id === nearest && (
							<NearestLabel>{t("span.nearest-agency")}</NearestLabel>
						)}
						<div className="d-none d-md-flex d-lg-none align-items-end pb-4 mt-2">
							<div
								style={{ backgroundColor: "var(--bg-blue)", borderRadius: 8 }}
								className={`px-${
									agency?.properties?.length > 9 ? "2" : "3"
								} py-2 mr-2 mb-1`}
							>
								{agency.properties?.length || 0}
							</div>
							<div className="mt-1">
								<p className="m-0 pb-1">{t("p.similar-properties-sold")}</p>
								<p className="d-flex m-0">
									{t("p.to")}
									<MainPropAddress>
										{mainProperty?.property?.search_address}
									</MainPropAddress>
								</p>
							</div>
						</div>
					</AgencyInfo>
				</AgencyLeftBlock>
				<AgencyRightBlock className="d-none d-lg-flex align-items-end pb-4 w-md-100">
					<div
						style={{ backgroundColor: "var(--bg-blue)", borderRadius: 8 }}
						className={`px-${
							agency?.properties?.length > 9 ? "2" : "3"
						} py-2 mr-2 mb-1`}
					>
						{agency.properties?.length || 0}
					</div>
					<div className="mt-1">
						<p className="m-0">{t("p.similar-properties-sold")}</p>
						<p className="d-flex m-0">
							{t("p.to")}
							<MainPropAddress>
								{mainProperty?.property?.search_address}
							</MainPropAddress>
						</p>
					</div>
				</AgencyRightBlock>
				<div
					className="d-none d-lg-flex"
					style={{ height: 60, paddingRight: 10 }}
				>
					<UpOutlined rotate={showMoreInfo ? 180 : 0} />
				</div>
				<AgencyRightBlock className="d-flex d-md-none align-items-end pb-4 w-100">
					<div
						style={{ backgroundColor: "var(--bg-blue)", borderRadius: 8 }}
						className={`px-${
							agency?.properties?.length > 9 ? "2" : "3"
						} py-2 mr-2 mb-1`}
					>
						{agency.properties?.length || 0}
					</div>
					<div style={{ width: "80%" }} className="mt-1">
						<p className="m-0">{t("p.similar-properties-sold")}</p>
						<p className="d-flex m-0">
							{t("p.to")}
							<MainPropAddress>
								{mainProperty?.property?.search_address}
							</MainPropAddress>
						</p>
					</div>
				</AgencyRightBlock>
			</AgencyInfoBlock>
			{showMoreInfo && (
				<div className="d-flex flex-row flex-md-column flex-lg-row justify-content-between">
					<MoreInfoLeftBlock className="d-flex flex-column">
						<div className="d-flex">
							<Image
								style={{ height: "60px", width: "60px" }}
								src={
									agency?.agent?.user?.avatar
										? agency?.agent?.user?.avatar
										: noLogo
								}
								roundedCircle
							/>
							<div className="d-flex flex-column justify-content-center ml-2">
								<AgentName>
									{agency?.agent?.user?.firstname}{" "}
									{agency?.agent?.user?.lastname}
								</AgentName>
								<span>{t("button.agency-owner")}</span>
							</div>
						</div>
						<div
							className="my-3"
							style={{ fontSize: "14px", lineHeight: "19px" }}
							dangerouslySetInnerHTML={agencyDesc(
								"10",
								agency?.properties?.length
							)}
						></div>
						<LinksBlock className="d-flex flex-column flex-md-row flex-lg-column">
							<Button onClick={() => openContactModal()}>
								{t("button.contact")} {agency?.agent?.user?.firstname}
							</Button>
							<Link href={`/agency/${agency.id}`} locale={locale}>
								<span>
									{t("button.agency-details")}{" "}
									<img src={ArrowImage} alt="ArrowImage" />
								</span>
							</Link>
						</LinksBlock>
					</MoreInfoLeftBlock>

					<MoreInfoMapBlock className="d-none d-md-flex flex-column">
						<div
							style={{ minHeight: 200, height: "100%", width: "100%" }}
							className="position-relative"
						>
							<GoogleMap {...mapProps} />
						</div>
						<div className=" d-flex justify-content-between">
							<div className="d-flex align-items-center">
								<OrangeCircle />
								<span>{t("span.your-property")}</span>
							</div>
							<div className="d-flex align-items-center">
								<BlueCircle />
								<span>{t("span.similar-property")}</span>
							</div>
							<div className=" d-flex align-items-center">
								<img
									className="mr-1"
									style={{ height: "12px", width: "12px" }}
									src={AgencyStarImage}
									alt="AgencyStarImage"
								/>
								<span>{t("span.agency")}</span>
							</div>
						</div>
					</MoreInfoMapBlock>
				</div>
			)}
		</div>
	);
};

export default Agency;
