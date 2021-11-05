import React from "react";
import { useTranslation } from "next-i18next";

import Agency from "../../../../containers/Agency";

const FindAgentBlock = ({ mainProperty, agencies, properties }) => {
	const { t } = useTranslation("dashboard-page");

	return (
		<div className="find-agent-block">
			<h3>{t("title.find-your-agent")}</h3>
			<p>
				{t("desc.we-found")} {agencies.length} {t("desc.agents-near-you")}
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
		</div>
	);
};

export default FindAgentBlock;
