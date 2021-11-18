import React from "react";
import { useTranslation } from "next-i18next";
import { Button } from "antd";
import styled from "styled-components";
import Agency from "../../../../containers/Agency";

const FindAgentMain = styled.div`
	background: #fff;
	border-radius: 10px;
	font-familiy: var(--fontNunito);
	p {
		font-size: 14px;
		line-height: 19px;
	}
	h3 {
	font-familiy: var(--fontNunitoBold);
	}
	@media (min-width: 769px) {
		padding: 30px;
	}
	@media (max-width: 769px) {
		padding: 20px;
	}


`

const FindAgentBlock = ({
	mainProperty,
	agencies,
	properties,
	onLoadMore,
	isLoadingMore,
	isLoadMoreAvailable,
	totalAgencies,
}) => {
	const { t } = useTranslation("dashboard-page");
	const myAgencies = [
		{
			agent : {
				name: "ashraf",
				user: {
					firstname: "ashraf",
					lastname: "ali"
				}
			},
			rating : {
				rating: 4,
				user_ratings_total: 3,
			},
			properties : [],
			company_name: "test",
			id: 27,
			logo_image: "https://immobelgium.s3.eu-west-1.amazonaws.com/1635295013631%20-%20logo_eco-immo.png",

		}
	]

	return (
		<FindAgentMain >
			<h3>{t("title.find-your-agent")}</h3>
			<p>
				{t("desc.we-found")} {totalAgencies} {t("desc.agents-near-you")}
			</p>
			{agencies.map((agency, index) => (
				<Agency
					nearest={agencies[0]?.id}
					agency={agency}
					key={index}
					mainProperty={mainProperty}
					properties={properties}
				/>
			))}
			{isLoadMoreAvailable && (
				<div className="d-flex flex-row w-100 justify-content-center pt-3">
					<Button
						loading={isLoadingMore}
						onClick={onLoadMore}
						className="rounded-lg"
					>
						Load More
					</Button>
				</div>
			)}
		</FindAgentMain>
	);
};

export default FindAgentBlock;
