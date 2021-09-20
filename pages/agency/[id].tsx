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
import { getAgencyById, getProperties } from "../../network-requests";
import { useState } from "react";
import { RootState } from "../../types/state";
import Loading from "../../components/Loading";

const AgencyPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { id } = router.query;
	const { t } = useTranslation("agency-page");

	const userId = useSelector<RootState>((state) => state.userInfo.id);

	const [properties, setProperties] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [agency, setAgency] = useState(null);

	const _getProperties = async () => {
		try {
			const _properties = await getProperties(userId);
			setProperties([..._properties]);
		} catch (error) {
			console.log(error);
		}
	};

	const _getAgency = async () => {
		try {
			const _agency = await getAgencyById(Number(id));
			setAgency({ ..._agency });
		} catch (error) {
			console.log(error);
		}
	};

	const fetchAll = async () => {
		try {
			setIsLoading(true);
			const promises = [_getProperties(), _getAgency()];
			await Promise.all(promises);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAll();
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
				<FirstBlock properties={properties} currentAgency={agency} />
				{/* <SecondBlock /> */}
				<ThirdBlock
					currentAgency={agency}
					// elementsOnPage={elementsOnPage}
				/>
				<FourthBlock currentAgency={agency} />
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
