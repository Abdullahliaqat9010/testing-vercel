import React, { useState } from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeaderContainer from "../../containers/Header";
import FooterContainer from "../../containers/Footer";
import { Button } from "react-bootstrap";
import goAhead from "../../assets/images/compare-agency/go-ahead.svg";
import reviewImage from "../../assets/images/compare-agency/reviews-image.png";
import locationImage from "../../assets/images/compare-agency/location-image.png";
import homeImage from "../../assets/images/compare-agency/home-image.png";
import compareAgencyImage from "../../assets/images/compare-agency/agency-main-page-image.jpg";
import StarRatingComponent from "react-star-rating-component";
import RatingStar from "../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../assets/images/rating/star.svg";
import openArrow from "../../assets/images/compare-agency/open-arrow.svg";
import closeArrow from "../../assets/images/compare-agency/closed-arrow.svg";
import mapImage from "../../assets/images/compare-agency/map-image.png";
import blueStar from "../../assets/images/compare-agency/blue-star.svg";
import loadMore from "../../assets/images/load-more.svg";
import Link from "next/link";
import BlueGoAhead from "../../assets/images/blue-goAhead.svg";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import ContactAgentModal from "../../containers/Modals/ContactAgentModal";
import { useRouter } from "next/router";

// import FooterContainer from "../../containers/Footer"ContactAgentModal
const compareAgency = () => {

	const router = useRouter()
	const { query } = router
	console.log("query", query)

	const [open, setOpen] = useState<boolean>(false);
	const [openContactForm, setOpenContactForm] = useState<boolean>(false);
	const [selctedIdex, setSelctedIdex] = useState<Number>(-1);

	const agencyData = [
		{
			profile_image: reviewImage,
			name: "aa bb cc",
			rating: 3,
			totalRevies: 12,
			soldProperties: 23,
			owner: "hajahd",
			company_name: "abcd_abcd",

			agency_agent: {
				firstname: "abcd",
				lastname: "hahs",
				role: "agency owner",
			},
			description: "asjd amsdajs asdasjd asdjkashdj asjkdhasjda  sdajkhd",
			profile_link: "google.com",
		},
		{
			profile_image: locationImage,
			name: "aa bb cc",
			owner: "hajahd",
			rating: 3,
			totalRevies: 12,
			soldProperties: 0,
			company_name: "abcd_abcd",
			agency_agent: {
				firstname: "abcd",
				lastname: "hahs",
				role: "agency owner",
			},
			description: "asjd amsdajs asdasjd asdjkashdj asjkdhasjda  sdajkhd",
			profile_link: "google.com",
		},
	];

	const openDetail = (index) => {
		setSelctedIdex(index);
		setOpen(!open);
	};
	const closeContactForm = () => {
		setOpenContactForm(!openContactForm);
	};
	return (
		<>
			<HeaderContainer title="compare agency result" />
			<div className=" w-100 compare-agency-result">
				<div className="imageContanter d-flex">
					<img
						className="main-image"
						src={compareAgencyImage}
						alt="compareAgencyImage"
					/>
				</div>
				<div className="agency-result-container justify-content-center">
					<div className="result-agency">
						<p>
							We analyze thousands of local agents and find the best to compete
							you!
						</p>
						<div className="search-form d-flex">
							<input type="search" placeholder="City and State or ZIP"></input>
							<Button>
								Compare Agents <img src={goAhead} alt="goAhead" />
							</Button>
						</div>
					</div>
					<div className="agency-container">
						{agencyData?.length &&
							agencyData.map((agency, index) => {
								return (
									<div key={index}>
										<div className="agency d-flex">
											<div className="image-bassicInfo ">
												<img src={reviewImage} alt="reviewImage" />
												<div className="agency-basicInfo">
													<span className="agency-name">name</span>
													<p className="rating-row">
														{" "}
														<span className="rating"> 5.6 </span>
														<StarRatingComponent
															name="rate"
															renderStarIcon={(index, value) => (
																<img
																	className="rating-star"
																	src={
																		index <= value
																			? RatingStar
																			: RatingStarEmpty
																	}
																	alt={"RatingStar" + index}
																/>
															)}
															starCount={5}
															value={Number(4)}
														/>{" "}
														<span className="from-totla-reviews ">
															{" "}
															from 120 reviews{" "}
														</span>
													</p>
												</div>
											</div>
											<div className="  sold-by-agency justify-content-between">
												{agency.soldProperties > 0 ? (
													<p>
														<span className="noof-sold"> 67 </span>{" "}
														<span className="sold-title">
															Recent sales nearby
														</span>
													</p>
												) : (
													<p className="no-sold-properties">
														No information available
													</p>
												)}
												<img
													onClick={() => openDetail(index)}
													src={
														open && selctedIdex === index
															? closeArrow
															: openArrow
													}
													alt="arrows"
												/>
											</div>
										</div>

										{open && selctedIdex === index && (
											<div key={index} className="aency-detail-container">
												<div className="agency-detail-container-left">
													<div className="agency-owner-box">
														<img src={reviewImage} alt="agentImage" />
														<div>
															<p className="agent-name">name</p>
															<p className="agent-title">agency owner</p>
														</div>
													</div>
													<p className="agency-description">
														During the last 24 months, our agency has sold 39
														properties nearby including 18 similar to yours. Our
														team is at your disposal to manage your project
													</p>
													<Button onClick={closeContactForm}>
														Contact Thierry
													</Button>
													<div className="d-flex">
														<Link href="#">Agency details </Link>{" "}
														<img
															className=""
															src={BlueGoAhead}
															alt="BlueGoAhead"
														/>
													</div>
												</div>
												<div className="agency-map-container">
													<img src={mapImage} alt="map" />
													<div className="map-description">
														<p>
															{" "}
															<span></span> Properties sold by the agency{" "}
														</p>
														<p>
															{" "}
															<img
																className="blue-star"
																src={blueStar}
																alt="blueStar"
															/>{" "}
															agency{" "}
														</p>
													</div>
												</div>
											</div>
										)}
									</div>
								);
							})}

						<div className="w-100 justify-content-center text-center">
							<Button className="load-more">
								<img src={loadMore} alt="loadMore" /> load more{" "}
							</Button>
						</div>
					</div>
				</div>
			</div>
			{openContactForm && (
				<ContactAgentModal
					show={true}
					onClose={() => setOpenContactForm(false)}
					// properties={properties}
					agencyOwner={agencyData[0]?.agency_agent}
					agencyName={agencyData[0]?.company_name}
				/>
			)}
			{/* <FooterContainer/> */}
		</>
	);
};

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"dashboard-page",
				"header",
				"footer",
			])),
		},
	};
};

export default compareAgency;
