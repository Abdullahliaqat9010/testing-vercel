import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
	Button,
	ButtonGroup,
	Form,
	InputGroup,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";
import { message } from "antd";

import {
	goToPrevStepAction,
	setMainPropertyId,
	setUtilitiesDataAction,
	updatePropertyRequestAction,
} from "../../../../actions";
import { RootState } from "../../../../types/state";
import { toBool } from "../../../../utils";

import IconBack from "../../../../assets/images/long-arrow.svg";
import NorthInactive from "../../../../assets/images/steps/orientation/n-inactive.svg";
import NorthActive from "../../../../assets/images/steps/orientation/n-active.svg";
import NorthEastInactive from "../../../../assets/images/steps/orientation/ne-inactive.svg";
import NorthEastActive from "../../../../assets/images/steps/orientation/ne-active.svg";
import EastInactive from "../../../../assets/images/steps/orientation/e-inactive.svg";
import EastActive from "../../../../assets/images/steps/orientation/e-active.svg";
import SouthEastInactive from "../../../../assets/images/steps/orientation/se-inactive.svg";
import SouthEastActive from "../../../../assets/images/steps/orientation/se-active.svg";
import SouthInactive from "../../../../assets/images/steps/orientation/s-inactive.svg";
import SouthActive from "../../../../assets/images/steps/orientation/s-active.svg";
import SouthWestInactive from "../../../../assets/images/steps/orientation/sw-inactive.svg";
import SouthWestActive from "../../../../assets/images/steps/orientation/sw-active.svg";
import WestInactive from "../../../../assets/images/steps/orientation/w-inactive.svg";
import WestActive from "../../../../assets/images/steps/orientation/w-active.svg";
import NorthWestInactive from "../../../../assets/images/steps/orientation/nw-inactive.svg";
import NorthWestActive from "../../../../assets/images/steps/orientation/nw-active.svg";
import TooltipIcon from "../../../../assets/images/tooltip.svg";
import { generatePropertyData } from "../../../../utils/generatePropertyData";
import { createLeadProperty } from "../../../../network-requests";
import { isMobile } from "react-device-detect";
const StepFour = ({ setStep }) => {
	const { t } = useTranslation("steps");
	const dispatch = useDispatch();
	const router = useRouter();
	const { locale } = router;

	const {
		epc,
		view,
		orientation,
		atticValue,
		cellarValue,
		elevator,
		swimmingPool,
		indoorGarage,
		indoorGarageCheck,
		outdoorGarage,
		outdoorGarageCheck,
		carport,
		parking,
		carportCheck,
		solarPanels,
	} = useSelector((state: RootState) => state.stepsInfo.stepBlock.utilities);
	const {
		addressFromStepOne,
		additionalAddress,
		location,
		selectedProperty,
		propertyDetails,
		details,
	} = useSelector((state: RootState) => state.stepsInfo.stepBlock);
	const { propertyId } = useSelector((state: RootState) => state.stepsInfo);
	const isLoggedIn = useSelector<RootState>((state) => state.userInfo.auth);
	const userId = useSelector<RootState>((state) => state.userInfo.id);

	const [data, setFormData] = useState({
		epc,
		view,
		orientation,
		atticValue,
		cellarValue,
		elevator,
		swimmingPool,
		indoorGarage,
		indoorGarageCheck,
		outdoorGarage,
		outdoorGarageCheck,
		carport,
		parking,
		carportCheck,
		solarPanels,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleClickPrevBtn = () => {
		setStep(2);
	};

	const checkIfCheckbox = (name: string) => {
		return (
			name === "swimmingPool" ||
			name === "parking" ||
			name === "elevator" ||
			name === "indoorGarageCheck" ||
			name === "outdoorGarageCheck" ||
			name === "carportCheck"
		);
	};

	const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...data,
			[el.target.name]: checkIfCheckbox(el.target.name)
				? el.target.checked
				: +el.target.value < 0
					? +el.target.value * -1
					: el.target.value,
		});
	};

	const selectView = (el) => {
		setFormData({
			...data,
			view: el.target.name,
		});
	};

	const selectOrientation = (
		name: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"
	) => {
		setFormData({
			...data,
			orientation: name,
		});
	};

	const handleAddNumber = (elName: string) => {
		setFormData({
			...data,
			[elName]: ++data[elName],
		});
	};

	const handleSubtractNumber = (elName: string) => {
		setFormData({
			...data,
			[elName]: data[elName] > 0 ? --data[elName] : 0,
		});
	};

	const handleClickNextBtn = async () => {
		// if (propertyId) {
		// 	const utilities = { ...data };
		// 	const sendData = {
		// 		...generatePropertyData(
		// 			addressFromStepOne,
		// 			additionalAddress,
		// 			selectedProperty,
		// 			propertyDetails,
		// 			details,
		// 			utilities,
		// 			location
		// 		),
		// 	};
		// 	dispatch(updatePropertyRequestAction({ ...sendData }, propertyId));
		// } else {
		// 	dispatch(setUtilitiesDataAction(data));
		// 	router.push("/final-steps", locale + "/final-steps", { locale: locale });
		// }
		if (isLoggedIn) {
			message.info(t("button.add-property"));
			const utilities = { ...data };
			const property = {
				...generatePropertyData(
					addressFromStepOne,
					additionalAddress,
					selectedProperty,
					propertyDetails,
					details,
					utilities,
					location
				),
			};
			const { id: propertyId } = await createLeadProperty(
				{
					property: { ...property },
					residence_type: "other",
					interest: "asap",
					is_owner: true,
				},
				router.locale
			);
			dispatch(setMainPropertyId(propertyId));
			message.success(t("message.add-property-success"));
		} else {
			dispatch(setUtilitiesDataAction(data));
		}
		router.push("/final-steps", locale + "/final-steps", { locale: locale });
	};

	return (
		<div className="step-four d-flex flex-column justify-content-between">
			<div>
				<span className="step-title">{t("span.step")} 3</span>
				<h4>
					<span>{selectedProperty === "house" ? "home" : selectedProperty}</span>{" "}
					{t("title.details")}{" "}
					<span className="optional">({t("title.optional")})</span>
				</h4>
				<Form>
					<InputGroup className="epc">
						<Form.Label className="d-flex">
							<span key="tooltip-info" className="position-relative">
								{t("label.epc")}
								<OverlayTrigger
									overlay={
										<Tooltip id="tooltip-info">{t("tooltip.epc")}</Tooltip>
									}
								>
									<img
										className="tooltip-info"
										key="tooltip-info"
										src={TooltipIcon}
										alt="TooltipIcon"
									/>
								</OverlayTrigger>
							</span>
						</Form.Label>
						<div className="input-block">
							<Form.Control
								min={1}
								name="epc"
								value={data.epc}
								onChange={handleChangeVal}
								placeholder={t("placeholder.epc")}
								type="number"
							/>
							<InputGroup.Append>
								<InputGroup.Text>kWh/m²</InputGroup.Text>
							</InputGroup.Append>
						</div>
					</InputGroup>
					<div className="group-block d-flex flex-column">
						<span className="form-label">{t("label.view")}</span>
						<ButtonGroup aria-label="condition" className="custom-btn-group">
							<Button
								name="enclosed"
								className={`first-btn ${data.view === "enclosed" ? "custom-active" : ""
									}`}
								onClick={selectView}
							>
								{t("button.enclosed")}
							</Button>
							<Button
								name="normal"
								className={data.view === "normal" ? "custom-active" : ""}
								onClick={selectView}
							>
								{t("button.normal")}
							</Button>
							<Button
								name="good"
								className={data.view === "good" ? "custom-active" : ""}
								onClick={selectView}
							>
								{t("button.good")}
							</Button>
							<Button
								name="unique"
								className={`last-btn ${data.view === "unique" ? "custom-active" : ""
									}`}
								onClick={selectView}
							>
								{t("button.unique")}
							</Button>
						</ButtonGroup>
					</div>
					<div className="group-block d-flex align-items-center justify-content-between">
						<span className="form-label">{t("label.orientation-terras")}</span>
						<div className="terras-block">
							<img
								className="north"
								src={data.orientation === "N" ? NorthActive : NorthInactive}
								alt="North"
								onClick={() => selectOrientation("N")}
							/>
							<img
								className="north-east"
								src={
									data.orientation === "NE" ? NorthEastActive : NorthEastInactive
								}
								alt="North-East"
								onClick={() => selectOrientation("NE")}
							/>
							<img
								className="east"
								src={data.orientation === "E" ? EastActive : EastInactive}
								alt="East"
								onClick={() => selectOrientation("E")}
							/>
							<img
								className="south-east"
								src={
									data.orientation === "SE" ? SouthEastActive : SouthEastInactive
								}
								alt="South-East"
								onClick={() => selectOrientation("SE")}
							/>
							<img
								className="south"
								src={data.orientation === "S" ? SouthActive : SouthInactive}
								alt="South"
								onClick={() => selectOrientation("S")}
							/>
							<img
								className="south-west"
								src={
									data.orientation === "SW" ? SouthWestActive : SouthWestInactive
								}
								alt="South-West"
								onClick={() => selectOrientation("SW")}
							/>
							<img
								className="west"
								src={data.orientation === "W" ? WestActive : WestInactive}
								alt="West"
								onClick={() => selectOrientation("W")}
							/>
							<img
								className="north-west"
								src={
									data.orientation === "NW" ? NorthWestActive : NorthWestInactive
								}
								alt="North-West"
								onClick={() => selectOrientation("NW")}
							/>
						</div>
					</div>
					<InputGroup>
						<Form.Label className="d-flex">{t("label.attic")}</Form.Label>
						<div className="input-block">
							<Form.Control
								min={1}
								name="atticValue"
								value={data.atticValue}
								onChange={handleChangeVal}
								type="number"
							/>
							<InputGroup.Append>
								<InputGroup.Text>m²</InputGroup.Text>
							</InputGroup.Append>
						</div>
					</InputGroup>
					<InputGroup>
						<Form.Label className="d-flex">{t("label.cellar")}</Form.Label>
						<div className="input-block">
							<Form.Control
								min={1}
								name="cellarValue"
								value={data.cellarValue}
								onChange={handleChangeVal}
								type="number"
							/>
							<InputGroup.Append>
								<InputGroup.Text>m²</InputGroup.Text>
							</InputGroup.Append>
						</div>
					</InputGroup>
					<InputGroup>
						<Form.Label className="d-flex">
							{t(
								`label.step-4-elevator.${selectedProperty === "house" ? "home" : "appartment"
								}`
							)}
						</Form.Label>
						<label className="switch">
							<input
								className="custom-input"
								name="elevator"
								id="elevator"
								onChange={handleChangeVal}
								defaultChecked={data.elevator}
								type="checkbox"
							/>
							<span className="slider round" />
						</label>
					</InputGroup>
					<InputGroup>
						<Form.Label className="d-flex">{t("label.pool")}</Form.Label>
						<label className="switch">
							<input
								className="custom-input"
								name="swimmingPool"
								id="swimmingPool"
								onChange={handleChangeVal}
								defaultChecked={data.swimmingPool}
								type="checkbox"
							/>
							<span className="slider round" />
						</label>
					</InputGroup>
					<InputGroup>
						<Form.Label className="d-flex">{t("label.parking")}</Form.Label>
						<label className="switch">
							<input
								className="custom-input"
								name="parking"
								id="parking"
								onChange={handleChangeVal}
								defaultChecked={data.parking}
								type="checkbox"
							/>
							<span className="slider round" />
						</label>
					</InputGroup>
					{toBool(data.parking) && (
						<div className="bg-block">
							<InputGroup>
								<Form.Label>{t("label.indoor-garage")}</Form.Label>
								<div className="input-block input-border-radius-0">
									<InputGroup.Prepend>
										<InputGroup.Text
											onClick={() => handleSubtractNumber("indoorGarage")}
										>
											-
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										value={data.indoorGarage || 0}
										readOnly
										type="number"
									/>
									<InputGroup.Append>
										<InputGroup.Text
											onClick={() => handleAddNumber("indoorGarage")}
										>
											+
										</InputGroup.Text>
									</InputGroup.Append>
								</div>
							</InputGroup>
							<InputGroup>
								<Form.Label>{t("label.outdoor-garage")}</Form.Label>
								<div className="input-block input-border-radius-0">
									<InputGroup.Prepend>
										<InputGroup.Text
											onClick={() => handleSubtractNumber("outdoorGarage")}
										>
											-
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										value={data.outdoorGarage || 0}
										readOnly
										type="number"
									/>
									<InputGroup.Append>
										<InputGroup.Text
											onClick={() => handleAddNumber("outdoorGarage")}
										>
											+
										</InputGroup.Text>
									</InputGroup.Append>
								</div>
							</InputGroup>
							<InputGroup className="mb-0">
								<Form.Label>{t("label.carport")}</Form.Label>
								<div className="input-block input-border-radius-0">
									<InputGroup.Prepend>
										<InputGroup.Text
											onClick={() => handleSubtractNumber("carport")}
										>
											-
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										value={data.carport || 0}
										readOnly
										type="number"
									/>
									<InputGroup.Append>
										<InputGroup.Text onClick={() => handleAddNumber("carport")}>
											+
										</InputGroup.Text>
									</InputGroup.Append>
								</div>
							</InputGroup>
						</div>
					)}
					<InputGroup>
						<Form.Label>{t("label.solar-panels")}</Form.Label>
						<div className="input-block input-border-radius-0">
							<InputGroup.Prepend>
								<InputGroup.Text
									onClick={() => handleSubtractNumber("solarPanels")}
								>
									-
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control value={data.solarPanels} readOnly type="number" />
							<InputGroup.Append>
								<InputGroup.Text onClick={() => handleAddNumber("solarPanels")}>
									+
								</InputGroup.Text>
							</InputGroup.Append>
						</div>
					</InputGroup>
				</Form>
			</div>
			<div className= {isMobile ? " botton-syicky steps-btn-group d-flex justify-content-between": "steps-btn-group d-flex justify-content-between"} >
				<Button onClick={handleClickPrevBtn} className="prev-step">
					<img src={IconBack} alt="IconBack" />
					{t("button.back")}
				</Button>
				<Button onClick={handleClickNextBtn} className="next-step">
					{t("button.next")}
				</Button>
			</div>
		</div>
	);
};

export default StepFour;
