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
import {
	getAgencyById,
	getLeadProperties,
	getProperties,
} from "../../network-requests";
import { useState } from "react";
import { RootState } from "../../types/state";
import Loading from "../../components/Loading";
import ContactAgencyBlock from "../../components/ContactAgencyBlock";

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
			const _properties = await getLeadProperties();
			setProperties([..._properties]);
		} catch (error) {
			console.log(error);
		}
	};

	const _getAgency = async () => {
		try {
			const _agency = await getAgencyById(Number(id), router.locale);
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
			<div className="d-flex flex-row justify-content-center bd-highlight mb-2 w-100">
				<div className="d-flex flex-row agency-detail-page">
					<div className="Agency d-flex flex-column">
						<div className="d-flex flex-row">
							<Link href={"/dashboard"}>
								<span className="mt-3 Agency__back">
									<img src={ArrowImage} alt="ArrowImage" />{" "}
									{t("link.back-dashboard")}
								</span>
							</Link>
						</div>
						<div className="d-flex flex-row">
							<div className="d-flex flex-column">
								<FirstBlock properties={properties} currentAgency={agency} />
								{/* <SecondBlock />  */}
								{/* properties block */}
								<ThirdBlock
									currentAgency={agency}
									// elementsOnPage={elementsOnPage}
								/>

								<FourthBlock currentAgency={agency} />
							</div>
							<div className="pl-2 bd-highlight ">
								<ContactAgencyBlock
									agencyInfo={agency}
									properties={properties}
								/>
							</div>
						</div>
					</div>
				</div>
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
