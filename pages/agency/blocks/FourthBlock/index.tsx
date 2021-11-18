import React from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";

import RatingStar from "../../../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../../../assets/images/rating/star.svg";

import LoadMoreImage from "../../../../assets/images/load-more.svg";
import ActiveStar from "../../../../assets/images/rating/full-star.svg";
import NoActiveStar from "../../../../assets/images/rating/dark-star.svg";
import NoActiveLightStar from "../../../../assets/images/rating/star.svg";
import MessageIcon from "../../../../assets/images/message-icon.svg";
// import FlagIcon from '../../../../assets/images/flag.svg';
import Avatar from "../../../../assets/images/no-photo.png";
import google_reviews_image from "../../../../assets/images/google_reviews.png";
import { AgentsItem } from "../../../../types/agents";
import { useTranslation } from "react-i18next";
const FourthBlock = ({ currentAgency }: { currentAgency: any }) => {
	const { t } = useTranslation("agency-page");
	return (
		<div className="Agency__fourth-block">
			<div className="main-content">
				<h3>{t("h3.client-reviews")}</h3>
				<p> {t("p.for") + " " + currentAgency?.company_name}</p>
				<div className="main-rate-info">
					<div className="total-info">
						<div className="total-info__main">
							<div className="left-block">
								<span className="total">
									{parseFloat(currentAgency?.rating?.rating).toFixed(1)}
								</span>
								<div className="review-block d-flex flex-column">
									<div className="stars">
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
									</div>
									<span className="from">
										{t("span.from")} {currentAgency?.rating?.user_ratings_total}{" "}
										{t("span.reviews")}
									</span>
								</div>
							</div>
							<div className="right-block">
								<div className="statistic">
									{/* height: 743px;" */}
									<span className="stars">5</span>
									<img src={NoActiveStar} alt="NoActiveStar" />
									<ProgressBar now={96} />
									<span>96%</span>
								</div>
								<div className="statistic">
									<span className="stars">4</span>
									<img src={NoActiveStar} alt="NoActiveStar" />
									<ProgressBar now={3} />
									<span>3%</span>
								</div>
								<div className="statistic">
									<span className="stars">3</span>
									<img src={NoActiveStar} alt="NoActiveStar" />
									<ProgressBar now={1} />
									<span>1%</span>
								</div>
								<div className="statistic">
									<span className="stars">2</span>
									<img src={NoActiveStar} alt="NoActiveStar" />
									<ProgressBar now={0} />
									<span>0%</span>
								</div>
								<div className="statistic mb-0">
									<span className="stars">1</span>
									<img src={NoActiveStar} alt="NoActiveStar" />
									<ProgressBar now={0} />
									<span>0%</span>
								</div>
							</div>
						</div>
					</div>
					<div className="sort-block"></div>
					<div className="reviews-list">
						{currentAgency?.rating?.reviews?.map((review) => {
							return (
								<div className="review">
									<div className="review__head">
										<div className="review-title">
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
												value={Number(parseFloat(review?.rating).toFixed(1))}
											/>
											<span className="bold ml-2">{review?.author_name}</span>
										</div>
									</div>
									<div className="d-flex flex-row">
										<div className="review__content" style={{ width: "75%" }}>
											<div className="left-side">
												<p className="desc">{review?.text}</p>
												<div className="author-block">
													<img src={review?.profile_photo_url} alt="Avatar" />
													<span className="full-name">
														{review?.author_name}
													</span>
													<span className="commented">
														{t("span.commented-on")}
													</span>
													<span className="commented-date">
														{review?.relative_time_description}
													</span>
												</div>
											</div>
										</div>
										<div
											className="d-flex "
											style={{
												// width: "25%",
												border: "1px solid #EBEFF8",
												borderRadius: 5,
												padding: 25,
												height: 120,
											}}
										>
											<img
												alt="google-reviews"
												src={google_reviews_image}
												style={{ width: "100%", objectFit: "contain" }}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				{/* <Button className="load-more">
					<img src={LoadMoreImage} alt="LoadMoreImage" />{" "}
					{t("button.learn-more")}
				</Button> */}
			</div>
		</div>
	);
};

export default FourthBlock;
