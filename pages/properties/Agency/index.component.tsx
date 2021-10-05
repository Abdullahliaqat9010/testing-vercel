import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button } from "react-bootstrap";
import { Pagination } from "antd";
import moment from "moment";
import { useRouter } from "next/router";

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
import NoImage from "../../../assets/images/no-image-available.svg";
import blackCross from "../../../assets/images/black-eye-cross.svg";
import { getAgencyProperties } from "../../../network-requests";
import PropertyDetailsModal from "../../../containers/Modals/PropertyDetailsModal";

const PropertyCard = ({ property, onClick }) => {
	const { t } = useTranslation("properties-page");
	return (
		<div
			style={{ cursor: "pointer" }}
			className="w-100 property-container d-flex"
			onClick={() => onClick({ ...property })}
		>
			<div className="property-images-block d-flex">
				<input type="checkBox" className="mr-2"></input>
				<div className="d-flex flex-row align-items-center">
					<img
						className="first-image"
						src={
							property?.images[0]?.url_large
								? property?.images[0]?.url_large
								: NoImage
						}
						alt="eye"
					/>
					<div className="d-flex align-items-center flex-column ml-1">
						<img
							className="second-images"
							src={
								property?.images[1]?.url_large
									? property?.images[1]?.url_large
									: NoImage
							}
							alt="eye"
						/>
						<img
							className="second-images"
							src={
								property?.images[2]?.url_large
									? property?.images[2]?.url_large
									: NoImage
							}
							alt="eye"
						/>
					</div>
				</div>
			</div>
			<div className=" property-discription  d-flex">
				<div className="proprty-info">
					<div>
						<span className="address">{property.search_address}</span>
					</div>
					<div>
						<span className="sold-property">
							{`${t("span.sold-on")} ${
								property?.sold_rent_date
									? moment(property?.sold_rent_date).format("MMM DD, YYYY")
									: moment().format("MMM DD, YYYY")
							}`}{" "}
						</span>
					</div>
					<div className=" property-props mt-2 d-flex">
						<span className="mr-1">
							{property.live_area + " " + t("span.meter-square")}
						</span>
						<span className="mx-1">
							{property.bedrooms + " " + t("span.beds")}
							{property.bedrooms > 1 ? "s" : ""}
						</span>
						<span className="mx-1">
							{property.bathrooms + " " + t("span.baths")}
							{property.bathrooms > 1 ? "s" : ""}
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
	);
};

const SoldPropertiesPage = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [properties, setProperties] = useState([]);

	const { t } = useTranslation("properties-page");
	const router = useRouter();

	const _getAgencyProperties = async () => {
		try {
			const { items, meta } = await getAgencyProperties(currentPage, pageSize);
			console.log(items);
			setProperties([...items]);
			setTotalPages(meta?.totalItems);
			setCurrentPage(meta?.currentPage);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		_getAgencyProperties();
	}, [currentPage, pageSize]);

	return (
		<>
			<HeaderContainer title={t("title")} />
			<PropertyDetailsModal
				property={selectedProperty}
				show={modalVisible}
				onClose={() => {
					setModalVisible(false);
				}}
			/>
			<div className="SoldPropertiesPage container d-flex">
				<NavBarContainer />
				<div className="SoldPropertiesPage__container w-100">
					<div className="controler-block ">
						<div className=" title-button-block justify-content-between d-flex">
							<h1>{t("title")}</h1>
							<div className="bottons">
								<Button className="import-button">
									<img src={Upload} alt="AddIcon" />
									<span className="import-bt-text">{t("button.import")}</span>
								</Button>
								<Button onClick={() => router.push("/add-property")}>
									<img src={AddIcon} alt="AddIcon" />
									<span className="add-bt-text">{t("button.add")}</span>
								</Button>
							</div>
						</div>
						<div className="w-100 py-4 whole-selecter-block justify-content-between d-flex">
							<div>
								{" "}
								<input type="checkBox"></input>{" "}
								<span className=" total-listings pl-2">
									{" "}
									{t("span.select")} {properties.length} {t("span.properties")}{" "}
								</span>{" "}
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
								<PropertyCard
									onClick={(_property) => {
										setSelectedProperty({ ..._property });
										setModalVisible(true);
									}}
									key={index}
									property={property}
								/>
							))}
						<div className="load-more-block d-flex ">
							<Pagination
								current={currentPage}
								total={totalPages}
								pageSize={pageSize}
								onChange={(page, _pageSize) => {
									setCurrentPage(page);
									setPageSize(_pageSize);
								}}
								pageSizeOptions={["5", "10", "20", "50"]}
							/>
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
