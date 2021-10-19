import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { Divider, Radio, RadioGroupProps, DatePicker } from "antd";
import { Button } from "react-bootstrap";
import * as Yup from "yup";

import PicturesWall from "./components/PictureWall";
import AddressModal from "../../containers/Modals/AddressModal";

import arrow from "../../assets/images/arrow_up.svg";
import homeActive from "../../assets/images/home-active.svg";
import homeInactive from "../../assets/images/home-noactive.svg";
import appartmentActive from "../../assets/images/apartment-active.svg";
import appartmentInactive from "../../assets/images/apartment-noactive.svg";
import tickOutlined from "../../assets/images/header-step-success.svg";

const SubTitle = styled.h3`
	font-size: 18px;
	color: var(--mainColor);
	font-family: var(--fontNunitoBold);
	&:after {
		content: url(${arrow});
		padding-left: 10px;
		margin-top: -3px;
		position: absolute;
	}
`;

const FieldWithPostTab = ({ name, type, tabText }) => {
	return (
		<div style={{ position: "relative" }}>
			<div
				style={{
					position: "absolute",
					right: 0,
					height: "100%",
					width: 50,
					backgroundColor: "#F2F6FF",
					color: "#1D2E5B",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "0px 6px 6px 0px",
					border: "1px solid var(--colorGray)",
				}}
			>
				{tabText}
			</div>
			<Field
				className="form-input w-100"
				style={{ paddingRight: 70 }}
				name={name}
				type={type}
				min="0"
			/>
		</div>
	);
};

const RadioGroup = (props: RadioGroupProps) => {
	const options = props.options as Array<{ label: string; value: string }>;
	return (
		<Radio.Group
			size="large"
			onChange={props.onChange}
			value={props.value}
			name={props.name}
			buttonStyle="solid"
		>
			{options.map(({ label, value }, index) => {
				return (
					<RadioButton
						label={label}
						value={value}
						totalOptions={options.length}
						index={index}
						key={index}
					/>
				);
			})}
		</Radio.Group>
	);
};

const RadioButton = ({ label, value, totalOptions, index }) => {
	return (
		<Radio.Button
			value={value}
			style={{
				width: `${100 / totalOptions}%`,
				borderTopRightRadius: index === totalOptions - 1 ? 6 : 0,
				borderBottomRightRadius: index === totalOptions - 1 ? 6 : 0,
				borderTopLeftRadius: index === 0 ? 6 : 0,
				borderBottomLeftRadius: index === 0 ? 6 : 0,
				height: 46,
				border: "1px solid var(--colorGray)",
			}}
		>
			<div
				style={{
					width: "100%",
					textAlign: "center",
					paddingTop: 5,
				}}
			>
				{label}
			</div>
		</Radio.Button>
	);
};

const SelectButton = ({
	label,
	value,
	option,
	onSelect,
	activeIcon,
	inactiveIcon,
}) => {
	const [isSelected, setIsSelected] = useState(value === option);
	useEffect(() => {
		setIsSelected(value === option);
	}, [value]);

	return (
		<div
			id={option}
			className="d-flex flex-row justify-content-between"
			style={{
				borderRadius: 6,
				border: `1px solid ${isSelected ? "var(--colorBlue)" : "#E3E5EA"}`,
				padding: 10,
				color: `${isSelected ? "var(--colorBlue)" : "var(--mainColor)"}`,
				cursor: "pointer",
				fontSize: 16,
			}}
			onClick={() => onSelect(option)}
		>
			<div>
				<img src={isSelected ? activeIcon : inactiveIcon} className="pr-4" />
				{label}
			</div>
			<div className="d-flex justify-content-between">
				{isSelected && <img width={30} src={tickOutlined} />}
			</div>
		</div>
	);
};

const PropertyInfoForm = () => {
	const [isLocationModalVisible, setIsLocationModalVisible] = useState(true);

	const validationSchema = Yup.object().shape({
		city: Yup.string().required(),
		state: Yup.string().required(),
		street: Yup.string().required(),
		locality: Yup.string().required(),
		street_number: Yup.number()
			.min(1, "street number is not valid")
			.required("street number is required"),
		box_number: Yup.number()
			.min(1, "box number is not valid")
			.required("box number is required"),
		zip: Yup.number().min(1, "zip is not valid").required("zip is required"),
		total_area: Yup.number()
			.min(1, "total square is not valid")
			.required("total square is required"),
		live_area: Yup.number()
			.min(1, "living square is not valid")
			.required("living square is required"),
		bathrooms: Yup.number().min(1).required(),
		bedrooms: Yup.number().min(1).required(),
		floor: Yup.number().min(1).required(),
		facades: Yup.number().min(1).required(),
		parking_spots: Yup.number()
			.min(0, "parking spots is not valid")
			.required("parking spots is required"),
		garage_spots: Yup.number()
			.min(0, "garage spots is not valid")
			.required("garage spots is required"),
		construction_year: Yup.number()
			.min(1880, "contruction year is not valid")
			.required("contruction year is required"),
		renov_year: Yup.number()
			.min(1880, "renovation year is not valid")
			.required("renovation year is required"),
		sale_price: Yup.number()
			.min(1, "sale price is not valid")
			.required("sale price is required"),
		sold_date: Yup.mixed().required("property sold date is required"),
	});

	return (
		<React.Fragment>
			<AddressModal
				show={isLocationModalVisible}
				handleClose={() => setIsLocationModalVisible(false)}
			/>
			<Formik
				onSubmit={(values) => {
					console.log(values);
					return Promise.resolve("");
				}}
				validationSchema={validationSchema}
				initialValues={{
					city: "",
					state: "",
					street: "",
					street_number: "",
					box_number: "",
					locality: "",
					zip: "",
					building_type: "home",
					total_area: "",
					live_area: "",
					bathrooms: 1,
					bedrooms: 1,
					floor: 1,
					facades: 1,
					parking_spots: 1,
					garage_spots: 1,
					prestige: "basic",
					condition: "renovate",
					construction_year: "",
					renov_year: "",
					note: "",
					sold_date: null,
					sale_price: "",
					images: [],
				}}
			>
				{({ handleChange, values, setFieldValue, isSubmitting }) => {
					return (
						<Form>
							<SubTitle className="pt-4">Property Location</SubTitle>
							<div className="d-flex flex-row justify-content-between pt-1">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="city">
										City
									</label>
									<Field
										className="form-input form-input-error"
										name="city"
										type="text"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="city"
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="state">
										State
									</label>
									<Field className="form-input" name="state" type="text" />
									<ErrorMessage
										className="form-error"
										component="div"
										name="state"
									/>
								</div>
							</div>
							<div className="d-flex flex-row justify-content-between">
								<div className="d-flex flex-column form-input-block w-100 mr-3">
									<label className="form-label" htmlFor="street">
										Street
									</label>
									<Field
										className="form-input form-input-error"
										name="street"
										type="text"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="street"
									/>
								</div>
								<div className="d-flex flex-column form-input-block w-100 mr-3">
									<label className="form-label" htmlFor="street_number">
										№
									</label>
									<Field
										className="form-input"
										name="street_number"
										type="number"
										min="0"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="street_number"
									/>
								</div>
								<div className="d-flex flex-column form-input-block w-100">
									<label className="form-label" htmlFor="box_number">
										Box №
									</label>
									<Field
										className="form-input"
										name="box_number"
										type="number"
										min="0"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="box_number"
									/>
								</div>
							</div>
							<div className="d-flex flex-row">
								<div className="d-flex flex-column form-input-block w-40 mr-3">
									<label className="form-label" htmlFor="zip">
										ZIP
									</label>
									<Field
										className="form-input form-input-error"
										name="zip"
										type="number"
										min="0"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="zip"
									/>
								</div>
								<div className="d-flex flex-column form-input-block w-40">
									<label className="form-label" htmlFor="locality">
										Locality
									</label>
									<Field className="form-input" name="locality" type="text" />
									<ErrorMessage
										className="form-error"
										component="div"
										name="locality"
									/>
								</div>
							</div>
							<Divider />
							<SubTitle>Parameters</SubTitle>
							<div className="d-flex flex-row justify-content-between pt-1">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<SelectButton
										label="Home"
										option="home"
										value={values.building_type}
										activeIcon={homeActive}
										inactiveIcon={homeInactive}
										onSelect={(val) => {
											// console.log("val", val);
											setFieldValue("building_type", val);
										}}
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<SelectButton
										label="Appartment"
										option="appartment"
										value={values.building_type}
										activeIcon={appartmentActive}
										inactiveIcon={appartmentInactive}
										onSelect={(val) => {
											// console.log("val", val);
											setFieldValue("building_type", val);
										}}
									/>
								</div>
							</div>
							<div className="d-flex flex-row justify-content-between pt-1">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="total_area">
										Total Square
									</label>

									<FieldWithPostTab
										name="total_area"
										type="number"
										tabText="m²"
									/>

									<ErrorMessage
										className="form-error"
										component="div"
										name="total_area"
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="live_area">
										Living Square
									</label>
									<FieldWithPostTab
										name="live_area"
										type="number"
										tabText="m²"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="live_area"
									/>
								</div>
							</div>
							<div className="d-flex flex-row justify-content-between pt-1">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="bathrooms">
										Number of Baths
									</label>
									<Field
										className="form-input form-input-error"
										name="bathrooms"
										type="number"
										min="0"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="bathrooms"
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="bedrooms">
										Number of Bedrooms
									</label>
									<Field
										className="form-input"
										name="bedrooms"
										type="number"
										min="0"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="bedrooms"
									/>
								</div>
							</div>
							<div className="d-flex flex-row justify-content-between pt-1">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="floor">
										On which floor located
									</label>
									<Field
										className="form-input form-input-error"
										name="floor"
										type="number"
										min="0"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="floor"
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="facades">
										Facades
									</label>
									<Field
										className="form-input"
										name="facades"
										type="number"
										min="0"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="facades"
									/>
								</div>
							</div>
							<div className="d-flex flex-row justify-content-between pt-1">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="parking_spots">
										Parking spots
									</label>
									<Field
										className="form-input form-input-error"
										name="parking_spots"
										type="number"
										min="0"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="parking_spots"
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="garage_spots">
										Garage spots
									</label>
									<Field
										className="form-input"
										name="garage_spots"
										type="number"
										min="0"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="garage_spots"
									/>
								</div>
							</div>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="prestige">
									Prestige / quality of the home
								</label>
								<RadioGroup
									size="large"
									onChange={handleChange}
									value={values.prestige}
									name="prestige"
									options={[
										{ value: "basic", label: "Basic" },
										{ value: "average", label: "Average +" },
										{ value: "luxury", label: "Luxury" },
									]}
								/>
							</div>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="condition">
									Building condition
								</label>
								<RadioGroup
									size="large"
									onChange={handleChange}
									value={values.condition}
									name="condition"
									options={[
										{ value: "renovate", label: "To renovate" },
										{ value: "good", label: "Good" },
										{ value: "new", label: "New" },
									]}
								/>
							</div>
							<div className="d-flex flex-row justify-content-between pt-1">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="construction_year">
										Construction Year
									</label>
									<Field
										className="form-input form-input-error"
										name="construction_year"
										type="number"
										min="1880"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="construction_year"
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="renov_year">
										Renovation Year
									</label>
									<Field
										className="form-input"
										name="renov_year"
										type="number"
										min="1880"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="renov_year"
									/>
								</div>
							</div>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="note">
									Note about property
								</label>
								<Field
									className="form-input"
									name="note"
									type="text"
									as="textarea"
									style={{ height: "auto" }}
									rows={5}
									placeholder="Leave a short description about this property"
								/>
								<ErrorMessage
									className="form-error"
									component="div"
									name="note"
								/>
							</div>
							<Divider />
							<SubTitle>Sale info</SubTitle>
							<div className="d-flex flex-row justify-content-between pt-1">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="sale_price">
										Sale Price
									</label>
									<Field
										className="form-input form-input-error"
										name="sale_price"
										type="number"
										min="0"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="sale_price"
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="sold_date">
										Property sold MM / DD / YYYY
									</label>
									<DatePicker
										name="sold_date"
										style={{
											height: 46,
											borderRadius: 6,
											border: "1px solid var(--colorGray)",
										}}
										value={values.sold_date}
										format="MM / DD / YYYY"
										onChange={(date) => setFieldValue("sold_date", date)}
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="sold_date"
									/>
								</div>
							</div>
							<Divider />
							<SubTitle>Property photos</SubTitle>
							<p
								style={{
									fontSize: 14,
									fontWeight: 400,
									color: "var(--mainColor)",
								}}
							>
								{
									"Please upload upto 10 property photos. First photo is a featured photo."
								}
							</p>
							<PicturesWall
								setImages={(images) =>
									setFieldValue("images", [
										...images.map(({ response, url }) =>
											url ? url : response
										),
									])
								}
								images={values.images}
							/>

							<div className="mt-5 d-md-flex flex-md-row">
								<Button
									className="form-button w-md-49 mt-2 mr-2"
									block
									type="submit"
								>
									{isSubmitting ? "Loading..." : "Add Property"}
								</Button>
								<Button
									className="form-back-button w-md-49"
									block
									type="submit"
								>
									Save as draft
								</Button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</React.Fragment>
	);
};

export default PropertyInfoForm;
