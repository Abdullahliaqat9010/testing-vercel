import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GoogleApiWrapper, IProvidedProps, Map } from "google-maps-react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { googleMapConfig } from "../../../config/siteConfigs";

interface LocationMapProps extends PropsWithChildren<IProvidedProps> {
	width?: string | number;
}

const _LocationMap = ({ width }: LocationMapProps) => {
	const [center, setCenter] = useState({
		lat: 51.260197,
		lng: 4.402771,
	});
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
			zoom={20}
			containerStyle={{ width }}
			style={{ borderRadius: "0px 0px 4px 0px" }}
			google={google}
			initialCenter={{
				lat: 51.260197,
				lng: 4.402771,
			}}
			center={{ ...center }}
		></Map>
	);
};

const LocationMap = GoogleApiWrapper({
	apiKey: googleMapConfig.apiKey,
})(_LocationMap);

const LocationForm = () => {
	const { t } = useTranslation("register-agency-pages");
	const validationSchema = Yup.object().shape({
		vitrine_name: Yup.string().required(t("p.error")),
		city: Yup.string().required(t("p.error")),
		street: Yup.string().required(t("p.error")),
		street_number: Yup.number().required(t("p.error")),
		zip: Yup.number()
			.required(t("p.error"))
			.min(1000, t("error.zip-validation"))
			.max(9999, t("error.zip-validation")),
	});
	return (
		<Formik
			initialValues={{
				vitrine_name: "",
				city: "",
				street: "",
				street_number: "",
				zip: "",
			}}
			onSubmit={() => null}
			validationSchema={validationSchema}
		>
			{() => (
				<Form>
					<div className="d-flex flex-column form-input-block">
						<label className="form-label" htmlFor="vitrine_name">
							{t("label.vitrine-name")}
						</label>
						<Field className="form-input" name="vitrine_name" type="text" />
						<ErrorMessage
							className="form-error"
							component="div"
							name="vitrine_name"
						/>
					</div>
					<div className="d-flex flex-column form-input-block">
						<label className="form-label" htmlFor="city">
							{t("label.city")}
						</label>
						<Field className="form-input" name="city" type="text" />
						<ErrorMessage className="form-error" component="div" name="city" />
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
								className="form-input form-input-error"
								name="street_number"
								type="number"
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
							<label className="form-label" htmlFor="zip">
								{t("label.zipcode")}
							</label>
							<Field
								className="form-input"
								name="zip"
								type="number"
								min="1000"
								max="9999"
							/>
							<ErrorMessage className="form-error" component="div" name="zip" />
						</div>
					</div>
					<Button className="form-button mt-3" block type="submit">
						{t("button.next")}
					</Button>
				</Form>
			)}
		</Formik>
	);
};

const AddressModal = ({ show, handleClose }) => {
	return (
		<Modal
			className="map-modal"
			show={show}
			onHide={handleClose}
			size="lg"
			centered
		>
			<Modal.Header closeButton>Pick Address on Maps</Modal.Header>
			<Modal.Body>
				<div className="d-flex h-100">
					<div className="d-none d-md-flex w-40 align-items-center justify-content-center">
						<LocationForm />
					</div>
					<LocationMap width="60%" />
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default AddressModal;
