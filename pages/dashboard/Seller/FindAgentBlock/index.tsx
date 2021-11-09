import React from "react";
import { useTranslation } from "next-i18next";
import { Button } from "antd";

import Agency from "../../../../containers/Agency";

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

	return (
		<div className="find-agent-block">
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
		</div>
	);
};

export default FindAgentBlock;
