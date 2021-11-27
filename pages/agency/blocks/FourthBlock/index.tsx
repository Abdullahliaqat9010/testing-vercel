import React from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import NoImageFr from "../../../../assets/images/no-image-available-fr.svg";
import NoImage from "../../../../assets/images/no-image-available.svg";
import RatingStar from "../../../../assets/images/rating/full-star.svg";
import RatingStarEmpty from "../../../../assets/images/rating/star.svg";
import { Image } from "antd"
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
import styled from "styled-components"
import { useRouter } from "next/router";
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
`

const ReviewBlock = styled.div`
justify-content: space-between;
@media (min-width: 501px) {
	flex-direction: row;
}
@media (max-width: 500px) {
	flex-direction: column;
}
`

const ReviewTextBlock = styled.div`
@media (min-width: 501px) {
	width: 75%;
	padding-right: 30px;
}
@media (max-width: 500px) {
	width: 100%;

}
`

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

`

const PerReviewContainer = styled.div`
margin-top: 20px;
border-bottom: 1px solid rgba(56, 113, 239, 0.2);
padding-bottom: 20px;
`

const AllRoundRating = styled.div`
display: flex;
margin-bottom: 10px;
width: 100%;
-moz-box-align: center;
align-items: center;
img {
	width: 18px;
	height: 18px;
  }

  span {
	font-size: 12px;
	line-height: 16px;
	color: var(--colorGrayTwo);
  }

  .progress {
	width: 148px;
	height: 7px;
	margin: 0 8px;
	border-radius: 4px;
	background-color: var(--bg-blue);

	.progress-bar {
	  background-color: var(--colorOrange);
	}
  }
`

const RatingNumbers = styled.span`
display: block;
font-size: 14px;
line-height: 19px;
color: var(--mainColor);
margin-right: 3px;
`

const ReviewRightBlock = styled.div`
@media (min-width: 501px) {
	padding: 30px 30px 30px 0;
}
@media (max-width: 500px) {
	padding: 0px 30px ;

}
`
const MainRating = styled.div`
	img { 
		width: 20px;
		height: 20px;
		margin-right: 4px;
	}
	@media (min-width: 769px) {
		span {
			display: block;
			margin-top: 10px;
			font-size: 14px;
			line-height: 19px;
		}
	}
	@media (max-width: 768px) {
		span {
			margin-top: 4px;
		}
	}
`

const AllRoundRatingNumber = styled.span`

font-family: var(--fontNunitoBold);
color: var(--colorOrange);
@media (min-width: 769px) {
	font-size: 64px;
	line-height: 87px;
}
@media (max-width: 768px) {
	font-size: 46px !important;
	line-height: 63px !important;
	margin-right: 10px;
}
`

const ReviewLeftBlock = styled.div`
@media (min-width: 769px) {
	padding: 20px 30px 18px !important;
	display: flex;
	align-items: center;
	flex-direction: column;
}

@media (max-width: 768px) {
	padding: 27px 30px;
	flex-direction: column;

}
@media (max-width: 500px) {
	flex-direction: row;

}

`

const ToltalReview = styled.div`
@media (min-width: 501px) {
	width: 75%;
}
@media (max-width: 500px) {
	flex-direction: column;
	width: 100% !important;
	margin-bottom: 30px;
}
`

const TotalReviewBlock = styled.div`
width: 100%;
border: 1px solid var(--colorLightBlue);
border-radius: 8px;

@media (max-width: 500px) {
	flex-direction: column;

}
`

const ReviewAutherName = styled.span`
@media (min-width: 501px) {
    margin-left: 0.5rem!important;
}
@media (max-width: 500px) {
	margin-left: 0px!important;

}
`

const ReviewsMainContent = styled.div`
	background-color: var(--colorWhite);
	border-radius: 10px;
	margin-top: 20px;
	
	@media (min-width: 501px) {
		padding: 30px 30px 0px;
	}
	@media (max-width: 500px) {
		padding: 20px;
		margin-left: 10px;
	}
`

const ReviewContainer = styled.div`
h3 {
	font-family: var(--fontNunitoBold);
	font-size: 20px;
	line-height: 27px;
	margin-bottom: 10px;
  }

  p {
	font-size: 14px;
	line-height: 19px;
  }
`


const FourthBlock = ({ currentAgency }: { currentAgency: any }) => {
	const router = useRouter();
	const { locale } = router;
	const getImageLink = (review) => {
		if (review?.profile_photo_url) {
			return review.profile_photo_url;
		}
		return locale === "fr" ? NoImageFr : NoImage;
	};
	const { t } = useTranslation("agency-page");
	return (
		<div className="Agency__fourth-block">
			<ReviewsMainContent>
				<h3>{t("h3.client-reviews")}</h3>
				<p> {t("p.for") + " " + currentAgency?.company_name}</p>
				<div>
					<TotalReviewBlock className="d-flex">
						<ToltalReview className="d-flex">
							<ReviewLeftBlock>
								<AllRoundRatingNumber>
									{parseFloat(currentAgency?.rating?.rating).toFixed(1)}
									
								</AllRoundRatingNumber>
								<MainRating className="d-flex flex-column">
									<div >
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
									</div>
									<span >
										{t("span.from")} {currentAgency?.rating?.user_ratings_total}{" "}
										{t("span.reviews")}
									</span>
								</MainRating>
							</ReviewLeftBlock>
							<ReviewRightBlock>
								<AllRoundRating>
									{/* height: 743px;" */}
									<RatingNumbers>5</RatingNumbers>
									<img src={NoActiveStar} alt="NoActiveStar" />
									<ProgressBar now={96} />
									<span>96%</span>
								</AllRoundRating>
								<AllRoundRating>
									<RatingNumbers>4</RatingNumbers>
									<img src={NoActiveStar} alt="NoActiveStar" />
									<ProgressBar now={3} />
									<span>3%</span>
								</AllRoundRating>
								<AllRoundRating>
									<RatingNumbers>3</RatingNumbers>
									<img src={NoActiveStar} alt="NoActiveStar" />
									<ProgressBar now={1} />
									<span>1%</span>
								</AllRoundRating>
								<AllRoundRating>
									<RatingNumbers>2</RatingNumbers>
									<img src={NoActiveStar} alt="NoActiveStar" />
									<ProgressBar now={0} />
									<span>0%</span>
								</AllRoundRating>
								<AllRoundRating className=" mb-0">
									<RatingNumbers>1</RatingNumbers>
									<img src={NoActiveStar} alt="NoActiveStar" />
									<ProgressBar now={0} />
									<span>0%</span>
								</AllRoundRating>
							</ReviewRightBlock>
						</ToltalReview>
					</TotalReviewBlock>
					<div className="sort-block"></div>
					<div>
						{currentAgency?.rating?.reviews?.map((review) => {
						
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
														style={{ width:"100%", height:"100%" }}
														src={index <= value ? RatingStar : RatingStarEmpty}
														alt="RatingStar"
													/>
												)}
												starCount={5}
												value={Number(parseFloat(review?.rating).toFixed(1))}
											/>
											<ReviewAutherName>{review?.author_name}</ReviewAutherName>
										</ReviewTitle>
									</div>
									<ReviewBlock className="d-flex">
										<ReviewTextBlock className="d-flex" >
											<div className="d-flex flex-column justify-content-between">
												<p className="mt-2 mb-3">{review?.text}</p>
												<AutherBlock>
													<Image
														src={getImageLink(review)}
														preview={false}
														fallback={NoImage}
													/>
													{/* <img src={review?.profile_photo_url} alt="Avatar" /> */}
													<span >
														{review?.author_name}
													</span>
													<span className="opacity-50">
														{t("span.commented-on")}
													</span>
													<span >
														{review?.relative_time_description}
													</span>
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
				{/* <Button className="load-more">
					<img src={LoadMoreImage} alt="LoadMoreImage" />{" "}
					{t("button.learn-more")}
				</Button> */}
			</ReviewsMainContent>
		</div>
	);
};

export default FourthBlock;
