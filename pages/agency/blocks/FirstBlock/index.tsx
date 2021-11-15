import React, { useState } from "react";
import { Button } from "react-bootstrap";

import StarRatingComponent from "react-star-rating-component";

import ContactAgentModal from "../../../../containers/Modals/ContactAgentModal";
import ContactAgencyBlock from "../../../../components/ContactAgencyBlock";

import { AgentsItem } from "../../../../types/agents";

import BGImage from "../../../../assets/images/agency-page/bg-agency.jpeg";
import RatingStar from "../../../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../../../assets/images/rating/star.svg";
import AddressImage from "../../../../assets/images/agency-page/address-icon.svg";
import PhoneImage from "../../../../assets/images/agency-page/phone-icon.svg";
import ScheduleImage from "../../../../assets/images/agency-page/schedule-icon.svg";
import LanguagesImage from "../../../../assets/images/agency-page/langauges-icon.svg";
import websiteImage from "../../../../assets/images/agency-page/website-image.png";
import FacebookIcon from "../../../../assets/images/agency-page/social/facebook-icon.svg";
import TwitterIcon from "../../../../assets/images/agency-page/social/twitter-icon.svg";
import InstagramIcon from "../../../../assets/images/agency-page/social/instagram-icon.svg";
import YoutubeIcon from "../../../../assets/images/agency-page/social/youtube-icon.svg";
import LinkedinIcon from "../../../../assets/images/agency-page/social/linkedin-icon.svg";
import ArrowImage from "../../../../assets/images/arrow-blue.svg";
import MailIcon from "../../../../assets/images/mail-white-icon.svg";
import noAgencyLogo from "../../../../assets/images/no-image-available.svg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const FirstBlock = ({
	currentAgency,
	properties,
}: {
	currentAgency: any;
	properties: any[];
}) => {
	const { t } = useTranslation("agency-page");
	const{t:t2} = useTranslation("agency-settings");

	const [show, setShowBlock] = useState<boolean>(false);
	const [showContactModal, setShowContactModal] = useState<boolean>(false);

	const showPhone = () => {
		setShowBlock(true);
	};
	const getLanguages = (languages) => {
		let langs = [];

		for (const key in languages) {
			console.log("data from db",key )

			if (languages[key] === true) {
				langs.push(t(`languages.${key}`));
			}
		}
		console.log("array data",langs)

		return langs.join(", ");
	};

	return (
		<div className="Agency__first-block">
			<ContactAgentModal
				agencyId={currentAgency?.id}
				show={showContactModal}
				onClose={() => setShowContactModal(false)}
				properties={properties}
				agencyOwner={currentAgency?.owner}
				agencyName={currentAgency?.company_name}
			/>
			<div className="main-content">
				<img
					className="main-content__bg"
					src={
						currentAgency?.cover_image ? currentAgency?.cover_image : BGImage
					}
					alt="BGImage"
				/>
				<div className="agency-info">
					<div className="d-flex agency-info__title">
						<div className="logo-block">
							<img
								style={{ objectFit: "cover" }}
								src={
									currentAgency?.logo_image
										? currentAgency?.logo_image
										: noAgencyLogo
								}
								alt="logo"
							/>
						</div>
						<div className="agency-info__block">
							<h1 className="agency-name">{currentAgency?.company_name}</h1>
							<div className="rating-block d-flex align-items-center">
								<span className="total">
									{parseFloat(currentAgency?.rating?.rating).toFixed(1)}
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
									value={Number(currentAgency?.rating?.rating)}
								/>
								<span className="from">
									{" "}
									{t("span.from")} {currentAgency?.rating?.user_ratings_total}{" "}
									{t("span.reviews")}
								</span>
							</div>
							{/* <span className="gray">{t("span.when-join")}</span> */}
						</div>
					</div>
					<div className="agency-info__contact-block">
						<h2>{t("h2.title")}</h2>
						<div className="contact-agency-list">
							<div className="contact-agency-list__name">
								<img src={AddressImage} alt="AddressImage" />
								<span>{t("span.address")}</span>
							</div>
							<div className="contact-agency-list__info">
								<span>{`${currentAgency?.search_address}`}</span>
							</div>
						</div>
						<div className="contact-agency-list">
							<div className="contact-agency-list__name">
								<img src={PhoneImage} alt="PhoneImage" />
								<span>{t("span.contect-phone")}</span>
							</div>
							<div className="contact-agency-list__info">
								{show ? (
									<span className="hidden-phone">
										{currentAgency?.owner?.phone_number}
									</span>
								) : (
									<span onClick={showPhone} className="show-phone">
										{t("span.show-pnone")}
									</span>
								)}
							</div>
						</div>
						<div className="contact-agency-list">
							<div className="contact-agency-list__name">
								<img src={ScheduleImage} alt="ScheduleImage" />
								<span>{t("span.schedule")}</span>
							</div>
							<div className="contact-agency-list__info">
								<span> {t("span.Mon-Fri")}  {": 9:30AM-12:30PM, 1:30PM-5PM"}</span>
							</div>	
						</div>
						<div className="contact-agency-list">
							<div className="contact-agency-list__name">
								<img src={LanguagesImage} alt="LanguagesImage" />
								<span>{t("span.languages")}</span>
							</div>
							<div className="contact-agency-list__info">
								<span style={{ textTransform: "capitalize" }}>
									{getLanguages(JSON.parse(currentAgency?.languages))}
								</span>
							</div>
						</div>
						<div className="contact-agency-list">
							<div className="contact-agency-list__name">
								<img
									className="website"
									src={websiteImage}
									alt="LanguagesImage"
								/>
								<span>{t("span.website")}</span>
							</div>
							<div className="contact-agency-list__info">
								<a href={currentAgency?.website}>{currentAgency?.website}</a>
							</div>
						</div>
					</div>
					<div className="agency-info__social-links">
						<p>{t("p.social-contact")}</p>
						<div className="social-block">
							<img src={FacebookIcon} alt="FacebookIcon" />
							<img src={TwitterIcon} alt="TwitterIcon" />
							<img src={InstagramIcon} alt="InstagramIcon" />
							<img src={YoutubeIcon} alt="YoutubeIcon" />
							<img src={LinkedinIcon} alt="LinkedinIcon" />
						</div>
					</div>
					<div className="agency-info__about_us">
						<h3>{t("h3.about-agency")}</h3>
						
						<p>{currentAgency?.description}</p>
						{/* <span className="show-more">
							<img src={ArrowImage} alt="ArrowImage" />
							{t("span.show-more")}
						</span> */}
					</div>

					<Button
						className="contact"
						style={{ marginBottom: 30 }}
						onClick={() => setShowContactModal(true)}
					>
						<img
							style={{ marginRight: 10, paddingBottom: 5 }}
							src={MailIcon}
							alt="MailIcon"
						/>
						{t("button.contact-agency")}
					</Button>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ locale }) => {
	return {
	  props: {
		...(await serverSideTranslations(locale, [
		  "agency-settings",
		  "agency-page"
		
		])),
	  },
	};
  };
  

export default FirstBlock;
