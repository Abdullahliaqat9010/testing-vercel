import React from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";

import LoadMoreImage from "../../../../assets/images/load-more.svg";
import ActiveStar from "../../../../assets/images/rating/full-star.svg";
import NoActiveStar from "../../../../assets/images/rating/dark-star.svg";
import NoActiveLightStar from "../../../../assets/images/rating/star.svg";
import MessageIcon from "../../../../assets/images/message-icon.svg";
// import FlagIcon from '../../../../assets/images/flag.svg';
import Avatar from "../../../../assets/images/no-photo.png";
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
								<span className="total">4.6</span>
								<div className="review-block d-flex flex-column">
									<div className="stars">
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
									</div>
									<span className="from">
										{t("span.from")} 125 {t("span.reviews")}
									</span>
								</div>
							</div>
							<div className="right-block">
								<div className="statistic">
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
						<div className="total-info__feedback">
							<p>{t("p.question")}</p>
							<span className="leave-feedback">
								<img src={MessageIcon} alt="MessageIcon" />
								{t("span.leave-feedback")}
							</span>
						</div>
					</div>
					<div className="sort-block">
						<Form.Control
							className="custom-select"
							as="select"
							defaultValue="All reviews"
						>
							<option>{t("option.all-reviews")}</option>
							<option>...</option>
							<option>...</option>
						</Form.Control>
						<Form.Control
							className="custom-select"
							as="select"
							defaultValue="Popular first"
						>
							<option>{t("option.populer")}</option>
							<option>...</option>
							<option>...</option>
						</Form.Control>
					</div>
					<div className="reviews-list">
						<div className="review">
							<div className="review__head">
								<div className="review-title">
									<div className="stars-block">
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
										<img src={ActiveStar} alt="ActiveStar" />
									</div>
									<span className="bold">{t("span.experience")}</span>
								</div>
								{/*<img src={ FlagIcon } alt="FlagIcon" className="flag"/>*/}
							</div>
							<div className="review__content">
								<div className="left-side">
									<p className="desc">
										Amet minim mollit non deserunt ullamco est sit aliqua dolor
										do amet sint. Velit officia consequat duis enim velit
										mollit. Exercitation veniam consequat sunt nostrud amet.Amet
										minim mollit non deserunt ullamco est sit aliqua dolor do
										amet sint. Velit officia consequat duis enim velit mollit.
										Exercitation veniam consequat sunt nostrud amet.
									</p>
									<div className="author-block">
										<img src={Avatar} alt="Avatar" />
										<span className="full-name">Leslie Alexander</span>
										<span className="commented">{t("span.commented-on")}</span>
										<span className="commented-date">10/03/2021</span>
									</div>
								</div>
								<div className="right-side">
									<div className="rate-block">
										<div className="rating">
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
										</div>
										<span className="rating-name">
											{t("span.responsiveness")}
										</span>
									</div>
									<div className="rate-block">
										<div className="rating">
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
										</div>
										<span className="rating-name">
											{t("span.general-reception")}
										</span>
									</div>
									<div className="rate-block">
										<div className="rating">
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={NoActiveLightStar} alt="NoActiveLightStar" />
										</div>
										<span className="rating-name">
											{t("span.service-ratio")}
										</span>
									</div>
									<div className="rate-block">
										<div className="rating">
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={NoActiveLightStar} alt="NoActiveLightStar" />
										</div>
										<span className="rating-name">
											{t("span.competences")}{" "}
										</span>
									</div>
									<div className="rate-block">
										<div className="rating">
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={ActiveStar} alt="ActiveStar" />
											<img src={NoActiveLightStar} alt="NoActiveLightStar" />
										</div>
										<span className="rating-name">
											{t("span.service-quality")}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button className="load-more">
					<img src={LoadMoreImage} alt="LoadMoreImage" />{" "}
					{t("button.learn-more")}
				</Button>
			</div>
		</div>
	);
};

export default FourthBlock;
