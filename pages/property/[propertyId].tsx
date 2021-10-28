import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { isMobile } from "react-device-detect";
import Link from "next/link";

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

import { clearSimilarPropertiesLocation } from "../../actions";
import axios from "axios";
import { config } from "../../config/siteConfigs";
import ContactAgentModal from "../../containers/Modals/ContactAgentModal"

const PropertyPage = ({ property }) => {
	const { t } = useTranslation("property-page");
	const dispatch = useDispatch();
	const router = useRouter();
	const { locale } = router;

	const [showMapModal, setShowMapModal] = useState<boolean>(false);
	const [showContactModal, setOpenContactForm] = useState<boolean>(false);
	const [showRequestPriceModal, setShowRequestPriceModal] =
		useState<boolean>(false);
	const [propertyImages] = useState([
		...property?.images.map(({ url_small }) => url_small),
	]);

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
			setOpenContactForm(!showContactModal)
		}

	}

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
					<span className="PropertyPage__back">
						<img src={ArrowImage} alt="ArrowImage" /> {t("link.back")}
					</span>
				</Link>
				<div className="PropertyPage__main-content d-flex">
					<div className="property-info">
						<div className="images d-flex">
							<img
								className="main-image"
								src={propertyImages.length > 0 ? propertyImages[0] : NoImage}
								alt="FirstImage"
							/>
							<div className="second-block">
								<img
									src={propertyImages.length > 1 ? propertyImages[1] : NoImage}
									alt="SecondImage"
								/>
								<img
									src={propertyImages.length > 2 ? propertyImages[2] : NoImage}
									alt="ThirdImage"
								/>
							</div>
						</div>
						<div className="property-content d-flex">
							<div className="property-content__info w-75">
								<p className="address">{property?.search_address?? "klsja alsk a,skd klasj"}</p>
								<div className="d-flex w-100 align-items-center justify-content-between">
									<Button
										onClick={handleShowRequestPriceModal}
										className="request-price"
										variant="outline-primary"
									>
										{t("button.request-price")}
										<img src={ArrowImage} alt="ArrowImage" />
									</Button>
									<div className="info d-flex">
										<div className="square">
											<img src={squareIcon} alt="squareIcon" />
											<div className="d-flex flex-column">
												<span className="info__title">{t("span.square")}</span>
												<span className="info__desc">{`${property?.total_area?? ""}m²`}</span>
											</div>
										</div>
										<div className="beds">
											<img src={bedsIcon} alt="bedsIcon" />
											<div className="d-flex flex-column">
												<span className="info__title">{t("span.beds")}</span>
												<span className="info__desc">{property?.bedrooms}</span>
											</div>
										</div>
										<div className="baths">
											<img src={bathIcon} alt="bathIcon" />
											<div className="d-flex flex-column">
												<span className="info__title">{t("span.baths")}</span>
												<span className="info__desc">
													{property?.bathrooms}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								className="property-content__map"
								style={{ cursor: "pointer" }}
							>
								<img onClick={handleShowMapModal} src={Map} alt="Map" />
							</div>
						</div>
						<div className="agency-block">
							<p className="sold-by">{t("p.sold-by")}</p>
							<div className="agency-block__short-info">
								<div className="logo">
									<img src={TestAgency} alt="TestAgency" />
								</div>
								<div className="d-flex justify-content-between agency-block__blocks">
									<div className="left-block w-50">
										<p className="agency-name">Century 21 - PATRIMOINE 24</p>
										<div className="agency-stats">
											<span className="rate">5.0</span>
											<div className="stars-block">
												<img src={Stars} alt="Stars" />
											</div>
											<span className="from">
												{t("span.from")} 120 {t("span.reviews")}
											</span>
										</div>
									</div>
									<div className="right-block w-50">
										<span className="count">17</span>
										<span className="similar">{t("span.similar")}</span>
									</div>
								</div>
							</div>
						</div>
						{isMobile && (
							<Button onClick={shoeContactForm} className="contact-agency-btn">
								<img src={MailIcon} alt="MailIcon" />
								Contact this agency
							</Button>
						)}
					</div>
					{isMobile && showContactModal && (
						<ContactAgentModal
							show={showContactModal}
							onClose={() => setOpenContactForm(false)}
							properties={[property]}
							agencyOwner="owner name"
							agencyName="agency name"
							agencyId={2}
						/>
					)}

					{!isMobile && (
						<ContactAgencyBlock agencyInfo={{ id: 99, title: "" }} />
					)}
				</div>
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
