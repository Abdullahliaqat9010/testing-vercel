import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import {
	GoogleApiWrapper,
	IProvidedProps,
	Map,
	Marker,
} from "google-maps-react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { AutoComplete, Input, Modal } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import styled from "styled-components";

import { googleMapConfig } from "../../../config/siteConfigs";

const StyledModal = styled(Modal)`
	.modal-lg {
		width: "80vw";
	}
`;

interface LocationMapProps extends PropsWithChildren<IProvidedProps> {
	width?: string | number;
	center?: {
		lat: number;
		lng: number;
	};
}

const _LocationMap = ({ width, center }: LocationMapProps) => {
	const mapRef = useRef(null);

	useEffect(() => {
		mapRef.current?.map?.setMapTypeId("hybrid");
	}, [mapRef]);

	return (
		<Map
			ref={mapRef}
			fullscreenControl={false}
			zoomControl={false}
			mapTypeControl={false}
			streetViewControl={false}
			zoom={18}
			containerStyle={{ width }}
			mapTypeControlOptions={{}}
			style={{ borderRadius: "0px 0px 4px 0px" }}
			google={google}
			initialCenter={{
				lat: 51.260197,
				lng: 4.402771,
			}}
			center={{ ...center }}
		>
			<Marker
				position={{
					...center,
				}}
			/>
		</Map>
	);
};

const LocationMap = GoogleApiWrapper({
	apiKey: googleMapConfig.apiKey,
})(_LocationMap);

const LocationForm = ({ onLocationChange, onSubmit, initialValues }) => {
	const [addressOptions, setAddressOptions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedAddressText, setSelectedAddressText] = useState(
		initialValues?.search_address
	);

	const fetchAddressAutoComplete = async (query) => {
		setSelectedAddressText(query);
		try {
			setIsLoading(true);
			const { data } = await axios.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
					query
				)}.json?country=BE&language=en&types=address&access_token=pk.eyJ1IjoibWF0dGVvZ3JhY2VmZmEiLCJhIjoiY2txYjBiZW11MDVwcjJwbm1yMmdlaGY2eSJ9.5LiTaHbs8vlwsjwAMzm1eA`
			);

			const { features } = data;

			const _addressOptions = features.map((item) => {
				return {
					id: item.id,
					fullAddress: item.place_name,
					location: {
						lng: item.center[0],
						lat: item.center[1],
					},
					zip:
						item.context.filter((el) => el.id.indexOf("postcode") !== -1)[0]
							?.text || "",
					city:
						item.context.filter((el) => el.id.indexOf("place") !== -1)[0]
							?.text || "",
					region:
						item.context.filter((el) => el.id.indexOf("region") !== -1)[0]
							?.text || "",
					locality:
						item.context.filter((el) => el.id.indexOf("locality") !== -1)[0]
							?.text || "",
					street: item?.text || "",
					street_number: item?.address || "",
					country:
						item.context.filter((el) => el.id.indexOf("country") !== -1)[0]
							?.text || "",
				};
			});
			setAddressOptions([..._addressOptions]);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const { t } = useTranslation("register-agency-pages");
	const validationSchema = Yup.object().shape({
		search_address: Yup.string().required(t("p.error")),
		city: Yup.string().required(t("p.error")),
		street: Yup.string().required(t("p.error")),
		street_number: Yup.string().required(t("p.error")),
		zip: Yup.string().required(t("p.error")),
	});
	return (
		<div>
			<Formik
				initialValues={{
					...initialValues,
				}}
				onSubmit={(values) => onSubmit(values)}
				validationSchema={validationSchema}
			>
				{({ setFieldValue }) => (
					<Form>
						<div className="d-flex flex-column form-input-block">
							<label className="form-label" htmlFor="search_address">
								{t("label.enter-address")}
							</label>
							<AutoComplete
								dropdownClassName="certain-category-search-dropdown"
								style={{ width: "100%" }}
								options={addressOptions.map(({ fullAddress, id }) => {
									return {
										label: fullAddress,
										value: id,
									};
								})}
								onSelect={(value, option) => {
									setSelectedAddressText(option.label as string);
									const selectedAddress = addressOptions.find(
										({ id }) => id === value
									);

									setFieldValue("search_address", option.label as string);
									setFieldValue("street", selectedAddress?.street);
									setFieldValue(
										"street_number",
										selectedAddress?.street_number
									);
									setFieldValue("zip", selectedAddress?.zip);
									setFieldValue("locality", selectedAddress?.locality);
									setFieldValue("city", selectedAddress?.city);
									setFieldValue(
										"latlng",
										`${selectedAddress?.location?.lat},${selectedAddress?.location?.lng}`
									);

									onLocationChange(selectedAddress?.location);
								}}
								value={selectedAddressText}
							>
								<Input
									size="large"
									placeholder="input here"
									style={{
										borderRadius: 6,
										border: "1px solid #8F99B4",
										height: 46,
									}}
									onChange={(e) => fetchAddressAutoComplete(e.target.value)}
									suffix={isLoading ? <LoadingOutlined /> : <SearchOutlined />}
								/>
							</AutoComplete>
							<ErrorMessage
								className="form-error"
								component="div"
								name="search_address"
							/>
						</div>
						<div className="d-flex flex-column form-input-block">
							<label className="form-label" htmlFor="city">
								{t("label.city")}
							</label>
							<Field className="form-input" name="city" type="text" />
							<ErrorMessage
								className="form-error"
								component="div"
								name="city"
							/>
						</div>
						<div className="d-flex flex-column form-input-block">
							<label className="form-label" htmlFor="street">
								{t("label.street")}
							</label>
							<Field className="form-input" name="street" type="text" />
							<ErrorMessage
								className="form-error"
								component="div"
								name="street"
							/>
						</div>
						<div className="d-flex flex-row justify-content-between">
							<div
								style={{ width: "49%" }}
								className="d-flex flex-column form-input-block"
							>
								<label className="form-label" htmlFor="street_number">
									{t("label.street-number")}
								</label>
								<Field
									className="form-input"
									name="street_number"
									type="text"
								/>
								<ErrorMessage
									className="form-error"
									component="div"
									name="street_number"
								/>
							</div>
							<div
								style={{ width: "49%" }}
								className="d-flex flex-column form-input-block"
							>
								<label className="form-label" htmlFor="box_number">
									{t("label.box-number")}
								</label>
								<Field
									className="form-input form-input-error"
									name="box_number"
									type="text"
								/>
								<ErrorMessage
									className="form-error"
									component="div"
									name="box_number"
								/>
							</div>
						</div>
						<div className="d-flex flex-row justify-content-between">
							<div
								style={{ width: "49%" }}
								className="d-flex flex-column form-input-block"
							>
								<label className="form-label" htmlFor="zip">
									{t("label.zipcode")}
								</label>
								<Field className="form-input" name="zip" type="text" />
								<ErrorMessage
									className="form-error"
									component="div"
									name="zip"
								/>
							</div>
							<div
								style={{ width: "49%" }}
								className="d-flex flex-column form-input-block"
							>
								<label className="form-label" htmlFor="locality">
									{t("label.locality")}
								</label>
								<Field
									className="form-input form-input-error"
									name="locality"
									type="text"
								/>
								<ErrorMessage
									className="form-error"
									component="div"
									name="locality"
								/>
							</div>
						</div>
						<Button className="form-button mt-3" block type="submit">
							{t("button.next")}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

const AddressModal = ({ show, handleClose, onAddress, initialValues }) => {
	const [center, setCenter] = useState({
		lat: 51.260197,
		lng: 4.402771,
	});
	return (
		<Modal
			visible={show}
			onCancel={handleClose}
			centered
			style={{ minWidth: "70vw" }}
			bodyStyle={{ width: "100%" }}
			title="Pick Address on Map"
			footer={null}
		>
			<div
				style={{ minHeight: 200 }}
				className="d-flex d-lg-none position-relative mb-2"
			>
				<LocationMap center={center} width="100%" />
			</div>
			<div
				// style={{ backgroundColor: "red" }}
				className="d-flex flex-row align-items-center justify-content-center h-100 w-100"
			>
				<div
					style={{ flex: 1 }}
					className="align-items-center justify-content-center"
				>
					<LocationForm
						onLocationChange={(location) => {
							setCenter({ ...location });
						}}
						onSubmit={(values) => {
							onAddress(values);
							handleClose();
						}}
						initialValues={{ ...initialValues }}
					/>
				</div>
				<div
					style={{
						flex: 1.5,
						backgroundColor: "blue",
						minHeight: 550,
						height: "100%",
					}}
					className="position-relative ml-4 d-none d-lg-flex"
				>
					<LocationMap center={center} width="100%" />
				</div>
			</div>
		</Modal>
	);
};

export default AddressModal;
