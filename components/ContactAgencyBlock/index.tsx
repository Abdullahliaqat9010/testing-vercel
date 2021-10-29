import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { Button, Form } from "react-bootstrap";

import { RootState } from "../../types/state";

const ContactAgencyBlock = ({ agencyInfo }) => {
	const { t } = useTranslation("dashboard-page");
	const dispatch = useDispatch();
	const [validated, setValidated] = useState(false);

	const { firstname, lastname, email, phone_number } = useSelector(
		(state: RootState) => state.userInfo
	);

	const [data, setData] = useState({
		fullName: firstname + " " + lastname,
		phone: phone_number,
		email: email,
		desc: t("placeholder.message"),
		selectedProperty: "",
		freeCharge: false,
	});

	// useEffect(() => {
	// 	if (properties.length > 0) {
	// 		setData({ ...data, selectedProperty: properties[0].search_address });
	// 	}
	// }, [properties]);

	const handleOnChange = (el: React.ChangeEvent<HTMLInputElement>) => {
		setData({
			...data,
			[el.target.name]:
				el.target.name === "freeCharge" ? el.target.checked : el.target.value,
		});
	};

	const validation = () => {
		return (
			data?.fullName?.length > 0 &&
			data?.phone?.length > 0 &&
			data?.email?.length > 0 &&
			data?.selectedProperty?.length > 0
		);
	};

	const sendToAgency = () => {
		if (validation()) {
			// const findProp = properties.find(
			// 	(property) => property.search_address === data.selectedProperty
			// );
			// const dataInfo = {
			// 	agentId: agencyInfo.id,
			// 	phone: data.phone,
			// 	message: data.desc.length > 0 ? data.desc : t("placeholder.message"),
			// 	propertyId: findProp.id,
			// 	free_evaluated: data.freeCharge,
			// };
			// dispatch(contactAgencyAction(dataInfo));
		}

		setValidated(true);
	};

	return (
		<div className="contact-agency-block contact-aagency ">
			<div className="contact-agency">
				<h4>{t("title.contact-agency")}</h4>
				 {/* <p>{agencyInfo.title}</p>  */}
				<Form noValidate validated={validated}>
					<Form.Group controlId="fullName">
						<Form.Control
							required
							onChange={handleOnChange}
							name="fullName"
							type="text"
							value={data.fullName}
						/>
						<Form.Control.Feedback type="invalid">
							{t("error.required")}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId="phone">
						<Form.Control
							required
							onChange={handleOnChange}
							name="phone"
							type="text"
							placeholder={t("placeholder.enter")}
							value={data.phone}
						/>
						<Form.Control.Feedback type="invalid">
							{t("error.required")}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Control
							required
							onChange={handleOnChange}
							name="email"
							type="email"
							value={data.email}
						/>
						<Form.Control.Feedback type="invalid">
							{t("error.required")}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId="desc">
						<Form.Control
							placeholder={t("placeholder.message")}
							value={data.desc}
							as="textarea"
							rows={5}
							name="desc"
							onChange={handleOnChange}
						/>
					</Form.Group>
					<Form.Group controlId="select-property">
						<Form.Control
							onChange={handleOnChange}
							onSelect={(e) => console.log(e)}
							name="selectedProperty"
							className="custom-select"
							as="select"
							value={data.selectedProperty}
						>
							{/* {properties.map((property, index) => (
								<option key={index}>{property.search_address}</option>
							))} */}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="freeCharge">
						<Form.Check
							name="freeCharge"
							onChange={handleOnChange}
							type="checkbox"
							label={t("label.free-charge")}
							checked={data.freeCharge}
						/>
					</Form.Group>
					<div>
						<Button  className=" confirm-btn" onClick={sendToAgency}>
							{t("button.confirm")}
						</Button>
					</div>
				</Form>
			</div>
			{/* <div className="contact-agency-block__desc">
				<p>
					{t("p.desc-part1")} <span className="link">{t("span.link1")}</span>{" "}
					{t("p.desc-part2")}&nbsp;
					<span className="link">{t("span.link2")}</span> {t("p.desc-part3")}
				</p>
			</div> */}
		</div>
	);
};

export default ContactAgencyBlock;
