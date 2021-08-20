import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { NavDropdown, Image, Button } from "react-bootstrap";

import { isMobile, isMobileOnly } from "react-device-detect";

import Logo from "../../assets/images/logo.png";
import NoPhoto from "../../assets/images/no-photo.png";
import AddIcon from "../../assets/images/icon-plus.svg";
import LoginArrow from "../../assets/images/arrow.svg";
import LogoutIcon from "../../assets/images/nav-bar/logout.svg";
import CheckedIcon from "../../assets/images/valid-blue.svg";
import ProIcon from "../../assets/images/pro-workspace.svg";
import NunitoSans from "../../assets/fonts/NunitoSans-Regular.ttf";
import NunitoSansBold from "../../assets/fonts/NunitoSans-Bold.ttf";
import FirstSlide from "../../assets/images/main-page/slider/first-slide.jpeg";
import CurrentStepIcon from "../../assets/images/header-step-current.svg";
import SuccessStepIcon from "../../assets/images/header-step-success.svg";

import { RootState } from "../../types/state";
import navBarList from "../../config/navBarList";
import { config } from "../../config/siteConfigs";
import { clearStepsStateAction } from "../../actions";
import { parseJwt } from "../../utils";

const langList = [
	{
		id: "en",
		tag: "eng",
		label: "english",
	},
	{
		id: "fr",
		tag: "fr",
		label: "french",
	},
	{
		id: "nl",
		tag: "nl",
		label: "dutch",
	},
];

const HeaderContainer = ({
	title,
	mainPage,
}: {
	title: string;
	mainPage?: boolean;
}) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { locale } = router;
	const { t } = useTranslation("header");
	const { mainBlocks, stepBlock } = useSelector(
		(state: RootState) => state.stepsInfo
	);
	const { auth, userName, userSurname } = useSelector(
		(state: RootState) => state.userInfo
	);
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [openLangList, setOpenLangList] = useState<boolean>(false);

	const isActive = () => {
		if (isMobileOnly) {
			/**
			 * makes no scroll body
			 */
			if (!openMenu) {
				document.body.className += "modal-open";
			} else {
				document.body.classList.remove("modal-open");
			}
			setOpenMenu(!openMenu);
		}
	};

	const goToMainPage = () => {
		window.location.href = "/" + locale;
	};

	const Logout = async () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		await fetch("/api/logout", {
			method: "POST",
		});
		window.location.href = "/";
	};

	const openSwitcherBlock = () => {
		setOpenLangList(!openLangList);
	};

	const selectLang = (lang: string) => {
		router.push(router.pathname, "/" + lang + router.asPath, { locale: lang });
	};

	const goToLoginPage = () => {
		dispatch(clearStepsStateAction());
		router.push("/login", locale + "/login", { locale: locale });
	};

	const token = localStorage.getItem("access_token");
	const isLoggedIn = localStorage.getItem("access_token") ? true : false;
	const isAdmin = token ? parseJwt(token)?.account_type === "admin" : false;

	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="icon" href={"/favicon.ico"} />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href={"/apple-touch-icon.png"}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href={"/favicon-32x32.png"}
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href={"/favicon-16x16.png"}
				/>
				<link rel="manifest" href={"/site.webmanifest"} />
				<link rel="mask-icon" href={"/safari-pinned-tab.svg"} color="#3871ef" />

				<link rel="prefetch" type="font/ttf" as="font" href={NunitoSans} />
				<link rel="prefetch" type="font/ttf" as="font" href={NunitoSansBold} />
				{mainPage && !isMobile && (
					<link rel="preload" as="image" href={FirstSlide} />
				)}
				<meta name="robots" content="noindex, nofollow" />
				<meta name="apple-mobile-web-app-title" content="BelgiumImmo" />
				<meta name="application-name" content="BelgiumImmo" />
				<meta name="msapplication-TileColor" content="#3871ef" />
				<meta
					name="facebook-domain-verification"
					content="30qmvq4ldi8cytef4h7ao0hwkcvp4s"
				/>
				<meta name="theme-color" content="#3871ef" />
				<script
					id="Cookiebot"
					src={"https://consent.cookiebot.com/uc.js"}
					data-cbid={config.cookieKey}
					data-blockingmode="auto"
					type="text/javascript"
				/>
				<script
					data-cookieconsent="ignore"
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer = window.dataLayer || [];
                                            function gtag() {
                                                dataLayer.push(arguments)
                                            }
                                            gtag("consent", "default", {
                                                ad_storage: "denied",
                                                analytics_storage: "denied",
                                                wait_for_update: 500,
                                            });
                                            gtag("set", "ads_data_redaction", true);`,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2446941,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
       })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
					}}
				/>
			</Head>
			<div className="Header d-flex justify-content-between align-items-center">
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Image
						onClick={() => goToMainPage()}
						className={`logo ${auth ? "ml-67" : ""}`}
						src={Logo}
						alt="Logo"
					/>
					<div className="custom-nav-links-container">
						{!isAdmin && (
							<>
								<a href="#" className="n-link-custom">
									Price map
								</a>
								{/* <a href="#" className="n-link-custom">
									Estimate your home
								</a> */}
								{/* <a href="#" className="n-link-custom">
									Compare agencies
								</a> */}
							</>
						)}
						<a href="/blogs" className="n-link-custom">
							Blogs
						</a>
						{isAdmin && (
							<a href="/create-blog" className="n-link-custom">
								Create Blog
							</a>
						)}
					</div>
				</div>
				{mainBlocks && stepBlock.step <= 3 && (
					<div className="step-info">
						<div
							className={`header-step-one ${
								stepBlock.step === 0 ? "active-step" : ""
							}`}
						>
							<div
								className={`image-block ${
									stepBlock.step !== 0 ? "success" : ""
								}`}
							>
								<img
									src={stepBlock.step !== 0 ? SuccessStepIcon : CurrentStepIcon}
									alt="steps-icon"
								/>
							</div>
							{t("span.step")} 1
						</div>
						<div
							className={`header-step-two ${
								stepBlock.step === 1 ? "active-step" : ""
							}`}
						>
							<div
								className={`image-block ${stepBlock.step > 1 ? "success" : ""}`}
							>
								{stepBlock.step >= 1 && (
									<img
										src={stepBlock.step > 1 ? SuccessStepIcon : CurrentStepIcon}
										alt="steps-icon"
									/>
								)}
							</div>
							{t("span.step")} 2
						</div>
						<div
							className={`header-step-three ${
								stepBlock.step > 1 ? "active-step" : ""
							}`}
						>
							<div className="image-block">
								{stepBlock.step >= 2 && (
									<img src={CurrentStepIcon} alt="steps-icon" />
								)}
							</div>
							{t("span.step")} 3
						</div>
					</div>
				)}
				<div className="d-flex align-items-center">
					{auth ? (
						<div className="right-block d-flex align-items-center">
							{!mainBlocks && (
								<>
									{!openMenu && (
										<Image
											className="user-avatar"
											src={NoPhoto}
											alt="avatar"
											roundedCircle
										/>
									)}
									<NavDropdown
										title={isMobileOnly ? "" : userName + " " + userSurname}
										id="header-dropdown"
										onClick={isActive}
									>
										{!isAdmin && (
											<NavDropdown.Item
												href={"/" + locale + "/pro-workspace"}
												className="pro-workspace"
											>
												<img src={ProIcon} alt="ProIcon" />
												{t("li.pro-workspace")}
											</NavDropdown.Item>
										)}
										{isMobileOnly && (
											<Button
												onClick={goToMainPage}
												className="add-property-mobile"
											>
												<img src={AddIcon} alt="AddIcon" />
												<span>{t("button.add-property")}</span>
											</Button>
										)}
										{!isAdmin &&
											navBarList.map((list, index) => (
												<NavDropdown.Item
													href={"/" + locale + list.href}
													key={index}
												>
													<img src={list.img} alt={list.title} />
													{t(`nav-li.${list.id}`)}
												</NavDropdown.Item>
											))}
										<NavDropdown.Item onClick={Logout}>
											<img
												className="logout-image"
												src={LogoutIcon}
												alt="logout"
											/>
											Logout
										</NavDropdown.Item>
										{isMobileOnly && (
											<div className="mobile-block">
												<Image
													alt="avatar"
													className="user-avatar"
													src={NoPhoto}
													roundedCircle
												/>
												<span className="user-name">
													{userName + " " + userSurname}
												</span>
												{/*<span className="pro">PRO</span>*/}
												<div className="mobile-lang-list">
													{langList.map((lang, index) => (
														<span
															className={lang.id === locale ? "active" : ""}
															key={index}
															onClick={() => selectLang(lang.id)}
														>
															{lang.label}
														</span>
													))}
												</div>
											</div>
										)}
									</NavDropdown>
									{!isMobileOnly && (
										<div
											className={`switcher-lang position-relative ${
												openLangList ? "active-locale" : ""
											}`}
										>
											<span onClick={openSwitcherBlock}>{locale}</span>
											{openLangList && (
												<div className="lang-list">
													{langList.map((lang, index) => (
														<span
															className={lang.id === locale ? "active" : ""}
															key={index}
															onClick={() => selectLang(lang.id)}
														>
															{lang.tag}
															{lang.id === locale && (
																<img src={CheckedIcon} alt="CheckedIcon" />
															)}
														</span>
													))}
												</div>
											)}
										</div>
									)}
									{!openMenu && (
										<>
											{!isLoggedIn ? (
												<Button className="add-property" onClick={goToMainPage}>
													<img src={AddIcon} alt="AddIcon" />
													<span>{t("button.add-property")}</span>
												</Button>
											) : isAdmin ? (
												<div style={{ paddingLeft: 70 }} />
											) : (
												<Button className="add-property" onClick={goToMainPage}>
													<img src={AddIcon} alt="AddIcon" />
													<span>{t("button.add-property")}</span>
												</Button>
											)}
										</>
									)}
								</>
							)}
						</div>
					) : (
						<span className="sign-in-btn" onClick={goToLoginPage}>
							{t("button.login")} <img src={LoginArrow} alt="LoginArrow" />
						</span>
					)}
					{!auth && (
						<div
							className={`switcher-lang position-relative ${
								openLangList ? "active-locale" : ""
							}`}
						>
							<span onClick={openSwitcherBlock}>{locale}</span>
							{openLangList && (
								<div className={`lang-list ${!auth ? "p-right" : ""}`}>
									{langList.map((lang, index) => (
										<span
											className={lang.id === locale ? "active" : ""}
											key={index}
											onClick={() => selectLang(lang.id)}
										>
											{lang.tag}
											{lang.id === locale && (
												<img src={CheckedIcon} alt="CheckedIcon" />
											)}
										</span>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default HeaderContainer;
