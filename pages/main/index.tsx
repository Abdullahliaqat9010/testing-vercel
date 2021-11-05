import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../types/state";
import { useTranslation } from "next-i18next";
import ImagesBlock from "./ImagesBlock";
import TestimonialsBlock from "./TestimonialsBlock";
import StepsBlock from "../estimate/StepsBlock/index.component";
import InfoBlock from "./InfoBlock";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const MainPageComponent = () => {
	const router = useRouter();
	const { t } = useTranslation("main-page");

	const { locale } = router;

	return (
		<div className="main-page">
			<>
				<ImagesBlock />
				<InfoBlock />
				<TestimonialsBlock />
				<div className="short-footer d-flex justify-content-between">
					<p>
						<span> {t("label.main-page-footer-dec")}</span>
						<span>{new Date().getFullYear()}. {t("label.main-page-footer-rights")} </span>
					</p>
					<span className="link">
						<a href={locale + "/privacy-policy"} target="_blank">
						{t("label.main-page-footer-Politique")}
						</a>
					</span>
				</div>
			</>
			{/* )} */}
		</div>
	);
};
export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, ["header", "main-page"])),
		},
	};
};
export default MainPageComponent;
