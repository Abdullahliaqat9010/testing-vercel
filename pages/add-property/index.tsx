import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { notification } from "antd";
import { useRouter } from "next/router";

import FooterContainer from "../../containers/Footer";
import HeaderContainer from "../../containers/Header";
import PropertyInfoForm from "../../components/PropertyInfoForm";

import ArrowImage from "../../assets/images/arrow-blue.svg";
import mapImage from "../../assets/images/map.png";
import bath from "../../assets/images/bath-gray.svg";
import beds from "../../assets/images/beds-gray.svg";
import total_square from "../../assets/images/square-gray.svg";
import live_square from "../../assets/images/living-square-gray.svg";
import { createAgencyProperty } from "../../network-requests";

const Title = styled.h3`
	font-size: 24px;
	font-weight: 600;
	color: var(--mainColor);
	font-family: var(--fontNunitoBold);
`;

const Block = ({ icon, label, value }) => {
	return (
		<div className="w-50 p-2 d-flex flex-row">
			<img src={icon} width={40} />
			<div className="pl-3">
				<div
					style={{
						fontSize: 14,
						color: "var(--colorGray)",
						fontFamily: "var(--fontNunito)",
					}}
				>
					{label}
				</div>
				<div
					style={{
						fontSize: 16,
						color: "var(--mainColor)",
						fontFamily: "var(--fontNunitoBold)",
					}}
				>
					{value}
				</div>
			</div>
		</div>
	);
};

const Tag = ({ value }) => {
	return (
		<div
			className="p-2 mr-2"
			style={{
				backgroundColor: "#F2F6FF",
				color: "var(--mainColor)",
				borderRadius: 10,
			}}
		>
			{value}
		</div>
	);
};

const PropertyCard = () => {
	return (
		<div
			className="rounded p-4 w-100"
			style={{ backgroundColor: "white", height: "min-content" }}
		>
			<div className="d-flex flex-row w-100 justify-content-between">
				<div>
					<div
						style={{
							fontSize: 15,
							fontFamily: "var(--fontNunitoBold)",
							paddingBottom: 10,
							color: "var(--mainColor)",
						}}
					>
						Maison on
					</div>
					<div
						style={{
							fontSize: 17,
							color: "var(--mainColor)",
							fontFamily: "var(--fontNunitoBold)",
						}}
					>
						2464 Royal Ln. Mesa, New jersey 45463
					</div>
				</div>
				<div className="pl-2">
					<img
						src={mapImage}
						style={{ width: 80, height: 80, objectFit: "cover" }}
					/>
				</div>
			</div>
			<div className="w-100 d-flex flex-row flex-wrap pt-3">
				<Block icon={total_square} label="Total Square" value="100m²" />
				<Block icon={beds} label="Beds" value="2" />
				<Block icon={live_square} label="Living Square" value="100m²" />
				<Block icon={bath} label="Baths" value="4" />
			</div>
			<div className="d-flex flex-row flex-wrap mt-3">
				<Tag value="3 Floors" />
				<Tag value="2 Facades" />
				<Tag value="3 Parks" />
				<Tag value="No Garage" />
			</div>
		</div>
	);
};

const AddProperty = () => {
	const router = useRouter();

	const createProperty = (values) => {
		return new Promise(async (res, rej) => {
			console.log(values);
			try {
				notification.info({ message: "Adding Property" });
				const { sold_rent_date, sold_rent_price, images, ...rest } = values;
				await createAgencyProperty({
					sold_rent_date,
					sold_rent_price,
					images: [...images].join(","),
					property: { ...rest },
				});
				notification.success({ message: "Property added successfully" });
				router.replace("/properties");
				res("");
			} catch (error) {
				notification.error({ message: "Error Occurred" });
				console.log(error);
				rej(error);
			}
		});
	};

	return (
		<React.Fragment>
			<HeaderContainer title="Agency Info" />
			<div className="container mt-4" style={{ marginBottom: 50 }}>
				<Link href={"/properties"}>
					<span className="Agency__back">
						<img src={ArrowImage} alt="ArrowImage" /> Back to My Properties
					</span>
				</Link>
				<div className="d-flex flex-row w-100" style={{ height: "100%" }}>
					<div className=" rounded p-4" style={{ backgroundColor: "white" }}>
						<Title>Add Property</Title>
						<PropertyInfoForm onSubmit={createProperty} />
					</div>
					<div className="d-none d-lg-flex ml-3">
						<PropertyCard />
					</div>
				</div>
			</div>
			<FooterContainer />
		</React.Fragment>
	);
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ["header", "common"])),
	},
});

export default AddProperty;
