import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Row, Col } from "react-bootstrap";

import NavBarContainer from "../../../containers/NavBar";
import FooterContainer from "../../../containers/Footer";
import HeaderContainer from "../../../containers/Header";

import AddIcon from "../../../assets/images/icon-plus.svg";
import Upload from "../../../assets/images/upload.svg";
import EyeCross from "../../../assets/images/gray-eye-cross.svg";
import Delete from "../../../assets/images/delete.svg";
import Eye from "../../../assets/images/gray-eye.svg";
import blackeye from "../../../assets/images/black-eye.svg";
import loadMoreImage from "../../../assets/images/load-more.svg";
import image from "../../../assets/images/agency-page/bg-agency.jpeg";
import blackCross from "../../../assets/images/black-eye-cross.svg";
import { userToken } from "../../../config/siteConfigs";
import { parseJwt } from "../../../utils";

import { getPropertyForCurrentUserAction } from "../../../actions";
import { RootState } from "../../../types/state";
const SoldPropertiesPage = () => {
	const properties = [
		{
			search_address: "lahote ajksh ajs aksh aksh",
			id: 13443,
			total_area: 32,
			bedrooms: 3,
			bathrooms: 1,
			status: "active",
			sold_date: "june 2020",
		},
		{
			search_address: "lahote ajksh ajs aksh aksh",
			id: 13443,
			total_area: 32,
			bedrooms: 3,
			bathrooms: 1,
			sold_date: "june 2020",
			status: "block",
		},
	];
	const { t } = useTranslation("properties-page");
	const router = useRouter();
	const { locale } = router;
	//   const dispatch = useDispatch();

	//   const {properties} = useSelector((state: RootState) => state.userInfo);
	//   console.log("properties", properties)
	//   useEffect(() => {
	//     if (!userToken) {
	//       window.location.href = '/';
	//     }

	//     if (userToken) {
	//       const parseData = parseJwt(userToken);
	//       const elementsOnPage = 6;
	//       dispatch(getPropertyForCurrentUserAction({userId: parseData.id, elementsOnPage}));
	//     }
	//   }, []);

	//   const goToMainPage = () => {
	//     window.location.href = '/' + locale;
	//   };

	return (
		<>
			<HeaderContainer title={t("title")} />
			<div className="SoldPropertiesPage container d-flex">
				<NavBarContainer />
				<div className="SoldPropertiesPage__container w-100">
					<div className="controler-block ">
						<div className=" title-button-block justify-content-between d-flex">
							<h1>{t("title")}</h1>
							<div className="bottons">
								<Button className="import-button">
									<img src={Upload} alt="AddIcon" />
									<span className="import-bt-text">Import</span>
								</Button>
								<Button>
									<img src={AddIcon} alt="AddIcon" />
									<span className="add-bt-text">Add</span>
								</Button>
							</div>
						</div>
						<div className="w-100 py-4 whole-selecter-block justify-content-between d-flex">
							<div>
								{" "}
								<input type="checkBox"></input>{" "}
								<span className=" total-listings pl-2"> 2 Listings </span>{" "}
							</div>
							<div className="action-block">
								<Button className="mx-1">
									{" "}
									<img src={Eye} alt="eye" />
								</Button>
								<Button className="mx-1">
									{" "}
									<img src={EyeCross} alt="eye" />
								</Button>
								<Button className="ml-1">
									{" "}
									<img src={Delete} alt="eye" />
								</Button>
							</div>
						</div>

						{properties.length > 0 &&
							properties.map((property, index) => (
								<div className="w-100 property-container d-flex" key={index}>
									<div className="property-images-block d-flex">
										<input type="checkBox" className="mr-2"></input>
										<div className="d-flex flex-row align-items-center">
											<img className="first-image" src={image} alt="eye" />
											<div className="d-flex align-items-center flex-column ml-1">
												<img className="second-images" src={image} alt="eye" />
												<img className="second-images" src={image} alt="eye" />
											</div>
										</div>
									</div>
									<div className=" property-discription  d-flex">
										<div className="proprty-info">
											<div>
												<span className="address">
													{property.search_address}
												</span>
											</div>
											<div>
												<span className="sold-property">
													{property.sold_date}{" "}
												</span>
											</div>
											<div className=" property-props mt-2 d-flex">
												<span className="mr-1">
													{property.total_area + " " + "sq m"}
												</span>
												<span className="mx-1">
													{property.bedrooms + " " + t("span.beds")}
												</span>
												<span className="mx-1">
													{property.bathrooms + " " + t("span.baths")}
												</span>
											</div>
										</div>
										<div className=" d-flex view-property">
											{property.status === "active" ? (
												// {" "}
												<Button>
													{" "}
													<img src={blackeye} alt="eye" />
												</Button>
											) : (
												<Button>
													{" "}
													<img src={blackCross} alt="eye" />
												</Button>
											)}
										</div>
									</div>
								</div>
							))}
						<div className="load-more-block d-flex ">
							<Button className="load-more">
								{" "}
								<img src={loadMoreImage} alt="loadMore" /> load more
							</Button>
						</div>
					</div>
				</div>
			</div>
			<FooterContainer />
		</>
	);
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, [
			"header",
			"properties-page",
			"common",
		])),
	},
});

export default SoldPropertiesPage;
