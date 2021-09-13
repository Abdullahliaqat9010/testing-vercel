import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

import { Button } from "react-bootstrap";
import LoadMoreImage from "../../../../assets/images/load-more.svg";

import Agency from "../../../../containers/Agency";

import { agentsList } from "../../../../templates/agentsList";

const FindAgentBlock = ({ mainProperty, properties }) => {
	const { t } = useTranslation("dashboard-page");
	const dispatch = useDispatch();

	const elementsOnPage = 3;
	const [sizeArr, setSizeArr] = useState(elementsOnPage);
	const [sortedAgencyList, setSortAgencyList] = useState([...agentsList]);
	const agencyList = sortedAgencyList.slice(0, sizeArr);

	useEffect(() => {
		if (mainProperty?.lat && mainProperty?.lng) {
			const arrDist = agentsList.map((agency, index) => {
				return {
					agencyIndex: index,
					dist: +calcCrow(
						+mainProperty.lat,
						+mainProperty.lng,
						agency.location.lat,
						agency.location.lng
					).toFixed(1),
				};
			});

			const sortedArr = arrDist.sort(
				(first, second) => first.dist - second.dist
			);

			const newSortAgencyList = [];
			sortedArr.map((el) => newSortAgencyList.push(agentsList[el.agencyIndex]));
			setSortAgencyList([...newSortAgencyList]);
		}
	}, [mainProperty]);

	const calcCrow = (lat1, lon1, lat2, lon2) => {
		const R = 6371; // km
		const dLat = toRad(lat2 - lat1);
		const dLon = toRad(lon2 - lon1);
		const lat3 = toRad(lat1);
		const lat4 = toRad(lat2);

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat3) * Math.cos(lat4);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	};

	// Converts numeric degrees to radians
	const toRad = (value) => {
		return (value * Math.PI) / 180;
	};

	const loadMore = () => {
		setSizeArr(sizeArr + elementsOnPage);
	};

	return (
		<div className="find-agent-block">
			<h3>{t("title.find-your-agent")}</h3>
			<p>
				{t("desc.we-found")} {agentsList.length} {t("desc.agents-near-you")}
			</p>
			{agencyList.map((agency, index) => (
				<Agency
					nearest={agencyList[0]?.id}
					agency={agency}
					key={index}
					mainProperty={mainProperty}
					properties={properties}
				/>
			))}
			{agencyList.length < agentsList.length && (
				<Button className="load-more" onClick={loadMore}>
					<img src={LoadMoreImage} alt="LoadMoreImage" />
					{t("button.load-more")}
				</Button>
			)}
		</div>
	);
};

export default FindAgentBlock;
