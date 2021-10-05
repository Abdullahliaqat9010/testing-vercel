import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Link from "next/link";
import styled from "styled-components";

import FooterContainer from "../../containers/Footer";
import HeaderContainer from "../../containers/Header";
import PropertyInfoForm from "../../components/PropertyInfoForm";

import ArrowImage from "../../assets/images/arrow-blue.svg";

const Title = styled.h3`
	font-size: 24px;
	font-weight: 600;
	color: var(--mainColor);
	font-family: var(--fontNunitoBold);
`;

const AddProperty = () => {
	return (
		<React.Fragment>
			<HeaderContainer title="Agency Info" />
			<div className="container mt-4" style={{ marginBottom: 50 }}>
				<Link href={"/properties"}>
					<span className="Agency__back">
						<img src={ArrowImage} alt="ArrowImage" /> Back to My Properties
					</span>
				</Link>
				<div className="d-flex flex-row" style={{ height: "100%" }}>
					<div
						className="w-100 rounded p-4"
						style={{ backgroundColor: "white" }}
					>
						<Title>Add Property</Title>
						<PropertyInfoForm />
					</div>
					<div
						className="w-40 d-none d-lg-flex ml-3 rounded p-4"
						style={{ backgroundColor: "white" }}
					>
						b
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
