import React from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import { LoadingOutlined } from "@ant-design/icons";

import RatingStar from "../../../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../../../assets/images/rating/star.svg";

import LoadMoreImage from "../../../../assets/images/load-more.svg";
import ActiveStar from "../../../../assets/images/rating/full-star.svg";
import NoActiveStar from "../../../../assets/images/rating/dark-star.svg";
import UserPlaceholder from "../../../../assets/images/user_placeholder.png";
import NoActiveLightStar from "../../../../assets/images/rating/star.svg";
import MessageIcon from "../../../../assets/images/message-icon.svg";
// import FlagIcon from '../../../../assets/images/flag.svg';
import Avatar from "../../../../assets/images/no-photo.png";
import google_reviews_image from "../../../../assets/images/google_reviews.png";
import { AgentsItem } from "../../../../types/agents";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const AutherBlock = styled.div`
	display: flex;
	align-items: center;

	img {
		width: 14px;
		height: 14px;
		margin-right: 6px;
	}

	span {
		display: block;
		font-size: 12px;
		line-height: 16px;
		margin-right: 4px;
	}
`;

const ReviewBlock = styled.div`
	justify-content: space-between;
	@media (min-width: 501px) {
		flex-direction: row;
	}
	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

const ReviewTextBlock = styled.div`
	@media (min-width: 501px) {
		width: 75%;
	}
	@media (max-width: 500px) {
		width: 100%;
	}
`;

const ReviewTitle = styled.div`
	display: flex;
	align-items: center;
	span {
		font-family: var(--fontNunitoBold);
		font-size: 14px;
		line-height: 19px;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const PerReviewContainer = styled.div`
	margin-top: 20px;
	border-bottom: 1px solid rgba(56, 113, 239, 0.2);
	padding-bottom: 20px;
`;

const FourthBlock = ({
	currentAgency,
	reviews,
	isLoading,
	onLoadMore,
	isLoadMoreAvailable,
}) => {
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
					<div>
						{reviews?.map((review) => {
							return (
								<PerReviewContainer>
									<div className="d-flex align-items-center justify-content-between">
										<ReviewTitle>
											<StarRatingComponent
												name="rate"
												// className="custom-rate"
												renderStarIcon={(index, value) => (
													<img
														// className="rating-star"
														style={{ width: "100%", height: "100%" }}
														src={index <= value ? RatingStar : RatingStarEmpty}
														alt="RatingStar"
													/>
												)}
												starCount={5}
												value={Number(parseFloat(review?.rating).toFixed(1))}
											/>
											<span className="ml-2">{review?.author_name}</span>
										</ReviewTitle>
									</div>
									<ReviewBlock className="d-flex">
										<ReviewTextBlock className="d-flex justify-content-start">
											<div>
												{review?.text && (
													<p className="mt-2 mb-3">{review?.text}</p>
												)}
												<AutherBlock>
													<img
														src={
															review?.profile_photo_url
																? review?.profile_photo_url
																: UserPlaceholder
														}
														alt="Avatar"
													/>
													<span>{review?.author_name}</span>
													<span className="opacity-50">
														{t("span.commented-on")}
													</span>
													<span>{review?.relative_time_description}</span>
												</AutherBlock>
											</div>
										</ReviewTextBlock>
										<div
											className="d-flex mt-2"
											style={{
												// width: "25%",
												border: "1px solid #EBEFF8",
												borderRadius: 5,

												padding: 20,
												height: 120,
											}}
										>
											<img
												alt="google-reviews"
												src={google_reviews_image}
												style={{ width: "100%", objectFit: "contain" }}
											/>
										</div>
									</ReviewBlock>
								</PerReviewContainer>
							);
						})}
					</div>
				</div>

				{isLoadMoreAvailable && (
					<Button
						onClick={isLoading ? () => null : onLoadMore}
						//disabled={isLoading}
						className="load-more"
					>
						{isLoading ? (
							<LoadingOutlined style={{ marginRight: 10 }} />
						) : (
							<img src={LoadMoreImage} alt="LoadMoreImage" />
						)}
						{t("button.learn-more")}
					</Button>
				)}
			</div>
		</div>
	);
};

export default FourthBlock;
