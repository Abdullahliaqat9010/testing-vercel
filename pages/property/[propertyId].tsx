import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { isMobile, isMobileOnly } from "react-device-detect";
import Link from "next/link";
import StarRatingComponent from "react-star-rating-component";

import GoogleMapModal from "../../containers/Modals/GoogleMapModal";
import RequestPriceModal from "../../containers/Modals/RequestPriceModal";
import ContactAgencyBlock from "../../components/ContactAgencyBlock";
import HeaderContainer from "../../containers/Header";
import FooterContainer from "../../containers/Footer";

import ArrowImage from "../../assets/images/arrow-blue.svg";
import squareIcon from "../../assets/images/square-gray.svg";
import bedsIcon from "../../assets/images/beds-gray.svg";
import bathIcon from "../../assets/images/bath-gray.svg";
import MailIcon from "../../assets/images/mail-white-icon.svg";

import NoImage from "../../assets/images/no-image-available.svg";
import Map from "../../assets/images/template/map-img.png";
import Stars from "../../assets/images/template/stars.png";
import TestAgency from "../../assets/images/agents/test-agency.png";
import RatingStar from "../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../assets/images/rating/star.svg";
import styled from "styled-components"
import { clearSimilarPropertiesLocation } from "../../actions";
import axios from "axios";
import { config } from "../../config/siteConfigs";
import ContactAgentModal from "../../containers/Modals/ContactAgentModal";
import { getLeadProperties } from "../../network-requests";

const PropertyRightBlock = styled.div`
display: flex;
align-items: center;
span {
	font-family: var(--fontNunitoBold);
	font-size: 18px;
	line-height: 25px;
	padding: 9px 10px;
	background: var(--bg-blue);
	border-radius: 8px;
	margin-right: 12px;
}

p {
	display: block;
	width: 70%;
	font-size: 14px;
	line-height: 19px;
	margin:0px;
}
@media (min-width: 769px) { 
	width: 50%;
}
@media (max-width: 768px) { 
	margin-left: 16px;
	width: 100% !important;
	margin-top: 12px;
	span {
		font-size: 14px !important;
		line-height: 19px !important;
		padding: 6.5px 7.5px !important;
	}

	p {
		width: 100% !important;
	}
}

@media (max-width: 320px) {
	margin-left: 0px !important;
	width: 100% !important;
	position: absolute;
	bottom: 0;
	left: 0;
}
`

const PropertyLeftBlock = styled.div`
p { 
	font-family: var(--fontNunitoBold);
	font-size: 16px;
	line-height: 22px;
	margin-bottom: 5px;
}
margin-left: 14px !important;

@media (min-width: 769px) { 
	width: 50%;
}
@media (max-width: 768px) {
	width: 100%;

}
@media (max-width: 500px) {
	margin-left: 12px !important;
	p {
		width : 75%;
	}

}
`
const AgencyOnfoBlock = styled.div`
@media (max-width: 768px) { 
	flex-direction: column;
}

`

const AgencyLogoImage = styled.div`

border: 1px solid var(--colorLightGrey);
box-sizing: border-box;
padding:5px;
border-radius: 8px;
img {
	width: 145px;
}

@media (min-width: 769px) { 
	width: 150px;
	height: 82px;
}
@media (max-width: 768px) {
	width: 150px !important;
	height: 126px !important;
}
@media (max-width: 500px) {
	width: 64px !important;
	height: 64px !important;
	img {
		width: 100%;
		height: auto;
	}
}

`

const AgencyMainBlock = styled.div`
border-top: 1px solid rgba(56, 113, 239, 0.2);
margin-top: 30px;

@media (max-width: 500px) {
	position: relative;
	padding-bottom: 67px;
	margin-bottom: 20px;

}
`

const MapContainer = styled.div`

@media (max-width: 768px) {
	width: 191px;
	height: 94px;
	img {
		width: 100%;
		height: 100%;
	}
}

@media (max-width: 500px) {
	width: 100%;
	img {
		height: 86px !importent;
	}
}
`

const PropertyDisTile = styled.span`
font-size: 12px;
line-height: 16px;
display: block;
opacity: 0.7;
margin-bottom: 2px;
`

const PropertyDiscription = styled.span`
font-family: var(--fontNunitoBold);
font-size: 16px;
line-height: 22px;
`

const PropertyDiscriptionBlock = styled.div`
display: flex;
align-items: center;
img {
	width: 32px;
	height: 32px;
	margin-right: 12px;
}

@media (max-width: 500px) {
	flex-direction: column;
	img {
		margin-right: unset !important;
		margin-bottom: 12px;
	}
}
`

const PropertyAddressBlock = styled.div`
@media (max-width: 768px) {
	flex-direction: column-reverse !important;
	
}

`

const RequestPrice = styled.span`
padding: 10px 12px;
font-size: 12px;
line-height: 16px;
color: #3871EF;
border: 1px solid #3871EF;
border-radius: 10px;
height: 40px;
img {
	transform: rotate(270deg);
}
@media (max-width: 768px) {
	margin-top: 0px;
	width: 150px;
}
@media (max-width: 500px) {
	width: auto !important;
	position: absolute;
	right: 0;
	top: 6px;
}

`

const PropertyAddress = styled.p`
font-family: var(--fontNunitoBold);
@media (min-width: 501px) {
	font-size: 18px;
	line-height: 25px;
	margin-bottom: 16px;
}
@media (max-width: 500px) {
	width: 62%;
	font-size: 16px !important;
	line-height: 22px !important;
	margin-bottom: 30px !important;
}					
`

const PropertySubBlock = styled.div`
@media (min-width: 501px) {
	width: 75%;
	
}
@media (max-width: 500px) {
	width: 100%;
}
`

const PropertyContent = styled.div`
margin-top: 30px;
@media (min-width: 769px) {
	justify-content: space-between;
}
@media (max-width: 768px) {
	align-items: center;
}
@media (max-width: 500px) {
	position: relative;
	flex-direction: column;
}
`

const PropertyMainImage = styled.img`
@media (min-width: 769px) {
	width: 471px;
					height: 379px;
					margin-right: 10px;
					object-fit: cover;

}
@media (max-width: 768px) { 
	width: 454px;
	height: 379px;
	margin-right: 10px;
}

@media (max-width: 500px){
	width: 303px;
	height: 180px;
	margin-bottom: 10px;
	margin-right: 0px;
}
`

const PropertyMoreImage = styled.div`
	display: flex;

@media (min-width: 769px) {
	flex-direction: column;
	justify-content: space-between;

	img {
		width: 259px;
		height: 185px;
		object-fit: cover;
	}

}
@media (max-width: 768px) {
	flex-direction: column;
	justify-content: space-between;
	img {
		width: 200px;
		height: 185px;
	}
}

@media (max-width: 500px){
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	img {
		width: 146.5px;
		height: 110px;
	}
}
`

const PropertyImagesBlock = styled.div`
img {
	border-radius: 8px;
}
@media (min-width: 501px){
	justify-content: space-between;
	
}
@media (max-width: 500px){
	flex-direction: column;
	justify-content: center !important;
	align-items: center;
}
`

const PropertyInfo = styled.div`
background: var(--colorWhite);
border-radius: 10px;
	
@media (min-width: 769px){
	padding: 20px 20px 30px;
	max-width: 780px;
	max-height: 741px;
	
}
@media (max-width: 768px){
	padding: 20px 20px 30px;

	max-height: unset;
	max-width: unset;
}
@media (max-width: 500px){
	padding: 20px 10px 30px;

}
`

const PropertyMainContentBlock = styled.div`
@media (min-width: 769px){

justify-content: space-around;
}
@media (max-width: 768px){

justify-content: center;
margin-left:20px;
}
`


const PropertyPage = ({ property }) => {
	console.log(property);
	const { t } = useTranslation("property-page");
	const dispatch = useDispatch();
	const router = useRouter();
	const { locale } = router;
	const [agency] = useState(property?.agency ?? {});
	const [showMapModal, setShowMapModal] = useState<boolean>(false);
	const [showContactModal, setOpenContactForm] = useState<boolean>(false);
	const [showRequestPriceModal, setShowRequestPriceModal] =
		useState<boolean>(false);
	const [propertyImages] = useState([
		...property?.images.map(({ url_small }) => url_small),
	]);
	const [properties, setProperties] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleClearSimilarPropertiesLocation = () => {
		dispatch(clearSimilarPropertiesLocation());
	};

	const handleCloseMapModal = () => setShowMapModal(false);
	const handleShowMapModal = () => {
		handleClearSimilarPropertiesLocation();
		return setShowMapModal(true);
	};

	const handleCloseRequestPriceModal = () => setShowRequestPriceModal(false);
	const handleShowRequestPriceModal = () => {
		handleClearSimilarPropertiesLocation();
		return setShowRequestPriceModal(true);
	};
	const shoeContactForm = () => {
		if (isMobile) {
			setOpenContactForm(!showContactModal);
		}
	};

	const _getProperties = async () => {
		try {
			setIsLoading(true);
			const _properties = await getLeadProperties();
			setProperties([..._properties]);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		_getProperties();
	}, []);

	return (
		<>
			<HeaderContainer title={t("title")} />
			<GoogleMapModal
				property={property}
				show={showMapModal}
				handleClose={handleCloseMapModal}
			/>
			<RequestPriceModal
				show={showRequestPriceModal}
				handleClose={handleCloseRequestPriceModal}
				property={property}
			/>
			<div className="PropertyPage container">
				<Link href={"/dashboard"} locale={locale}>
					<span className="d-flex mb-3" style ={{
						cursor: 'pointer',
						color: '#3871EF',
						fontSize: '14px',
						lineHeight: '19px',
					}}>
						<img style={{
							marginRight: '6px',
							transform: `rotate(90deg)`,
						}} src={ArrowImage} alt="ArrowImage" /> {t("link.back")}
					</span>
				</Link>
				<PropertyMainContentBlock className=" d-flex">
					<PropertyInfo>
						<PropertyImagesBlock className="d-flex">
							<PropertyMainImage
								src={
									property?.images.length > 0 ? property?.images[0] : NoImage
								}
								alt="FirstImage"
							/>
							<PropertyMoreImage>
								<img
									src={
										property?.images.length > 1 ? property?.images[1] : NoImage
									}
									alt="SecondImage"
								/>
								<img
									src={
										property?.images.length > 2 ? property?.images[2] : NoImage
									}
									alt="ThirdImage"
								/>
							</PropertyMoreImage>
						</PropertyImagesBlock>
						<PropertyContent className="d-flex">
							<PropertySubBlock>
								<PropertyAddress>
									{property?.property?.search_address ?? ""}
								</PropertyAddress>
								<PropertyAddressBlock className="d-flex ">
									<RequestPrice
										// onClick={handleShowRequestPriceModal}
										// className="request-price"
										variant="outline-primary"
									>
										{t("button.request-price")}
										<img src={ArrowImage} alt="ArrowImage" />
									</RequestPrice>
									<div className="w-100 mb-4 d-flex ml-4">
										{property?.property?.live_area && (
											<PropertyDiscriptionBlock>
												<img src={squareIcon} alt="squareIcon" />
												<div className="d-flex flex-column">
													<PropertyDisTile>
														{t("span.square")}
													</PropertyDisTile>
													<PropertyDiscription>{`${property?.property?.live_area} m²`}</PropertyDiscription>
												</div>
											</PropertyDiscriptionBlock>
										)}
										{property?.property?.bedrooms && (
											<PropertyDiscriptionBlock className="ml-2">
												<img src={bedsIcon} alt="bedsIcon" />
												<div className="d-flex flex-column">
													<PropertyDisTile>{t("span.beds")}</PropertyDisTile>
													<PropertyDiscription>
														{property?.property?.bedrooms}
													</PropertyDiscription>
												</div>
											</PropertyDiscriptionBlock>
										)}
										{property?.property?.bathrooms && (
											<PropertyDiscriptionBlock className="ml-2">
												<img src={bathIcon} alt="bathIcon" />
												<div className="d-flex flex-column">
													<PropertyDisTile>{t("span.baths")}</PropertyDisTile>
													<PropertyDiscription>
														{property?.property?.bathrooms}
													</PropertyDiscription>
												</div>
											</PropertyDiscriptionBlock>
										)}
									</div>
								</PropertyAddressBlock>
							</PropertySubBlock>
							<MapContainer
								style={{ cursor: "pointer" }}
							>
								<img onClick={handleShowMapModal} src={Map} alt="Map" />
							</MapContainer>
						</PropertyContent>
						<AgencyMainBlock>
							<p style={{
								marginTop: "30px",
								marginBottom: "20px",
								fontSize: "18px",
								lineHeight: "25px",
								fontFamily: `var(--fontNunitoBold)`,
							}}>{t("p.sold-by")}</p>
							<div className="d-flex align-items-center">
								<AgencyLogoImage className=" d-flex align-items-center justify-content-center">
									<img
										style={{ height: "100%", objectFit: "cover" }}
										src={agency?.logo_image}
										alt="TestAgency"
									/>
								</AgencyLogoImage>
								<AgencyOnfoBlock className="d-flex justify-content-between">
									<PropertyLeftBlock>
										<p
											style={{ cursor: "pointer" }}
											onClick={() => router.push(`/agency/${agency?.id}`)}

										>
											{agency?.company_name}
										</p>
										<div className="d-flex align-items-center">
											<span style={{ fontSize: "14px", lineHeight: '19px' }}>
												{property?.agency?.rating?.rating}
											</span>
											{/* <div className="stars-block">
												<img src={Stars} alt="Stars" />
											</div> */}
											<div className="mx-2 mt-1 d-flex align-items-center">
												<StarRatingComponent
													name="rate"
													// className="custom-rate"
													renderStarIcon={(index, value) => (
														<img
															style={{ width: 15 }}
															className="mx-1"
															src={
																index <= value ? RatingStar : RatingStarEmpty
															}
															alt="RatingStar"
														/>
													)}
													starCount={5}
													value={Number(agency?.rating?.rating)}
												/>
											</div>
											<span style={{ fontSize: "12px", lineHeight: '16px', opacity: '0.5' }}>
												{t("span.from")} {agency?.rating?.user_ratings_total}{" "}
												{t("span.reviews")}
											</span>
										</div>
									</PropertyLeftBlock>
									<PropertyRightBlock >
										<span >{agency?.propertiesCount}</span>
										<p>{t("span.similar")}</p>
									</PropertyRightBlock>
								</AgencyOnfoBlock>
							</div>
						</AgencyMainBlock>
						{isMobile && (
							<Button onClick={shoeContactForm} className="contact-agency-btn">
								<img src={MailIcon} alt="MailIcon" />
								Contact this agency
							</Button>
						)}
					</PropertyInfo>
					{isMobile && showContactModal && (
						<ContactAgentModal
							show={showContactModal}
							onClose={() => setOpenContactForm(false)}
							properties={[property]}
							agencyOwner=""
							agencyName={agency?.company_name}
							agencyId={agency?.id}
						/>
					)}

					{!isMobile && (
						<ContactAgencyBlock properties={properties} agencyInfo={agency} />
					)}
				</PropertyMainContentBlock>
			</div>
			<FooterContainer />
		</>
	);
};

export const getServerSideProps = async ({ params, locale }) => {
	const axiosInstance = axios.create({
		baseURL: config.apiDomain,
	});
	try {
		const { data: property } = await axiosInstance.get(
			`agency-property/${params?.propertyId}`
		);
		if (!property) {
			return {
				notFound: true,
			};
		}
		return {
			props: {
				property: {
					...property,
				},
				...(await serverSideTranslations(locale, [
					"header",
					"dashboard-page",
					"property-page",
					"common",
				])),
			}, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default PropertyPage;
