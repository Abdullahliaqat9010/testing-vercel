import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import HeaderContainer from "../../containers/Header";
import FooterContainer from "../../containers/Footer";

import ArrowImage from "../../assets/images/arrow-blue.svg";

import FirstBlock from "./blocks/FirstBlock";
import SecondBlock from "./blocks/SecondBlock";
import ThirdBlock from "./blocks/ThirdBlock";
import FourthBlock from "./blocks/FourthBlock";
import { useTranslation } from "react-i18next";
import { agentsList } from "../../templates/agentsList";
import { getProperties } from "../../network-requests";
import { useState } from "react";
import { RootState } from "../../types/state";
import Loading from "../../components/Loading";

const AgencyPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { slug } = router.query;
	const { t } = useTranslation("agency-page");

	const userId = useSelector<RootState>((state) => state.userInfo.id);

	const [properties, setProperties] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [currentAgency] = agentsList.filter((agency) => agency.url === slug);

	const _getProperties = async () => {
		try {
			setIsLoading(true);
			const _properties = await getProperties(userId);
			setProperties([..._properties]);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		_getProperties();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<HeaderContainer title="Agency Info" />
			<div className="Agency container">
				<Link href={"/dashboard"}>
					<span className="Agency__back">
						<img src={ArrowImage} alt="ArrowImage" /> {t("link.back-dashboard")}
					</span>
				</Link>
				<FirstBlock properties={properties} currentAgency={currentAgency} />
				{/* <SecondBlock/> */}
				{/* <ThirdBlock
					currentAgency={currentAgency}
					elementsOnPage={elementsOnPage}
				/> */}
				<FourthBlock currentAgency={currentAgency} />
			</div>
			<FooterContainer />
		</>
	);
};

export const getStaticPaths = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: "blocking", //indicates the type of fallback
	};
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, [
			"agency-page",
			"header",
			"dashboard-page",
			"common",
		])),
	},
});

export default AgencyPage;
