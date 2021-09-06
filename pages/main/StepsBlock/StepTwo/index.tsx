import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Form,
	InputGroup,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";
import { useTranslation } from "next-i18next";

import IconBack from "../../../../assets/images/long-arrow.svg";
import FloorsIcon from "../../../../assets/images/steps/floors.svg";
import FacadesIcon from "../../../../assets/images/steps/facades.svg";
import BedroomsIcon from "../../../../assets/images/steps/bedrooms.svg";
import BathroomsIcon from "../../../../assets/images/steps/bathrooms.svg";
import TooltipIcon from "../../../../assets/images/tooltip.svg";

import {
	goToNextStepAction,
	goToPrevStepAction,
	setPropertyDetailsAction,
} from "../../../../actions";
import { RootState } from "../../../../types/state";

const StepTwo = ({ setStep }) => {
	const { t } = useTranslation("steps");
	const dispatch = useDispatch();
	const {
		livingArea,
		landSurface,
		numberBathrooms,
		numberBedrooms,
		numberLevels,
		facadesNumber,
		numberFloors,
		elevator,
		gardenTerrasValue,
	} = useSelector(
		(state: RootState) => state.stepsInfo.stepBlock.propertyDetails
	);
	const { selectedProperty } = useSelector(
		(state: RootState) => state.stepsInfo.stepBlock
	);

	const [disabled, setDisabled] = useState(false);

	const [data, setFormData] = useState({
		livingArea,
		landSurface,
		numberBathrooms,
		numberBedrooms,
		numberLevels,
		numberFloors,
		facadesNumber,
		elevator,
		gardenTerrasValue,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		setDisabled(disabledButton());
	}, [data]);

	const handleClickPrevBtn = () => {
		setStep(0);
	};

	const handleClickNextBtn = () => {
		if (!disabled) {
			dispatch(setPropertyDetailsAction(data));
			setStep(2);
		}
		return false;
	};

	const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
		if (el.target.name === "livingArea") {
			return setFormData({
				...data,
				livingArea: +el.target.value >= 1000 ? "1000" : el.target.value,
			});
		}

		if (el.target.name === "landSurface") {
			return setFormData({
				...data,
				landSurface: +el.target.value >= 20000 ? "20000" : el.target.value,
			});
		}

		return setFormData({
			...data,
			[el.target.name]:
				el.target.name === "elevator"
					? el.target.checked
					: +el.target.value < 0
					? +el.target.value * -1
					: el.target.value,
		});
	};

	const handleAddNumber = (elName: string) => {
		if (elName === "facadesNumber") {
			setFormData({
				...data,
				facadesNumber: data.facadesNumber < 4 ? ++data.facadesNumber : 4,
			});
		} else {
			setFormData({
				...data,
				[elName]: ++data[elName],
			});
		}
	};

	const handleSubtractNumber = (elName: string) => {
		if (elName === "facadesNumber") {
			setFormData({
				...data,
				facadesNumber: data.facadesNumber > 2 ? --data.facadesNumber : 2,
			});
		} else {
			setFormData({
				...data,
				[elName]: data[elName] > 1 ? --data[elName] : 1,
			});
		}
	};

	const disabledButton = () => {
		return (
			Number(data.livingArea) === 0 ||
			(selectedProperty === "house" && Number(data.landSurface) === 0)
		);
	};

	return (
		<div className="step-two">
			<span className="step-title">{t("span.step")} 2</span>
			<h4>
				<span>
					{selectedProperty === "house"
						? t("select.home")
						: t(`select.${selectedProperty}`)}
				</span>{" "}
				{t("title.details")}
			</h4>
			<Form>
				<Form.Row>
					<InputGroup className="mb-3">
						<Form.Label>{t("label.living-area")}*</Form.Label>
						<div className="input-block">
							<Form.Control
								min={1}
								max={1000}
								name="livingArea"
								value={data.livingArea}
								type="number"
								onChange={handleChangeVal}
							/>
							<InputGroup.Append>
								<InputGroup.Text>m²</InputGroup.Text>
							</InputGroup.Append>
						</div>
					</InputGroup>
					<InputGroup className="range">
						<InputGroup.Prepend className="prepend">
							<InputGroup.Text>0 m²</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							name="livingArea"
							value={data.livingArea}
							type="range"
							onChange={handleChangeVal}
							min={0}
							max={1000}
						/>
						<InputGroup.Append className="append">
							<InputGroup.Text>1,000 m²</InputGroup.Text>
						</InputGroup.Append>
					</InputGroup>
					{selectedProperty === "house" && (
						<>
							<InputGroup className="mb-3">
								<Form.Label className="position-relative custom-width-40">
									{t("label.land-surface")}*
									<OverlayTrigger
										overlay={
											<Tooltip id="tooltip-info">{t("tooltip-info")}</Tooltip>
										}
									>
										<img
											className="tooltip-info"
											key="tooltip-info"
											src={TooltipIcon}
											alt="TooltipIcon"
										/>
									</OverlayTrigger>
								</Form.Label>
								<div className="input-block block-with-tooltip">
									<Form.Control
										min={1}
										max={20000}
										name="landSurface"
										value={data.landSurface}
										type="number"
										onChange={handleChangeVal}
									/>
									<InputGroup.Append>
										<InputGroup.Text>m²</InputGroup.Text>
									</InputGroup.Append>
								</div>
							</InputGroup>
							<InputGroup className="range">
								<InputGroup.Prepend className="prepend">
									<InputGroup.Text>0 m²</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									name="landSurface"
									value={data.landSurface}
									type="range"
									onChange={handleChangeVal}
									min={0}
									max={20000}
								/>
								<InputGroup.Append className="append">
									<InputGroup.Text>20,000 m²</InputGroup.Text>
								</InputGroup.Append>
							</InputGroup>
						</>
					)}
					{selectedProperty === "apartment" && (
						<>
							<InputGroup>
								<Form.Label className="d-flex terras-value-label">
									<span className="position-relative">
										{t("label.garden")}
										<OverlayTrigger
											overlay={
												<Tooltip id="tooltip-info">
													{t("tooltip.garden")}
												</Tooltip>
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
										min={0}
										name="gardenTerrasValue"
										value={data.gardenTerrasValue || 0}
										type="number"
										onChange={handleChangeVal}
									/>
									<InputGroup.Append>
										<InputGroup.Text>m²</InputGroup.Text>
									</InputGroup.Append>
								</div>
							</InputGroup>
							<InputGroup>
								<Form.Label className="d-flex">
									{t("label.elevator")}
								</Form.Label>
								<label className="switch">
									<input
										className="custom-input"
										value={data.elevator}
										name="elevator"
										id="apartmentElevator"
										onChange={handleChangeVal}
										type="checkbox"
									/>
									<span className="slider round" />
								</label>
							</InputGroup>
						</>
					)}
					<InputGroup>
						<Form.Label>
							<img src={FloorsIcon} alt="FloorsIcon" />
							<span className="custom-label">
								{selectedProperty === "apartment"
									? t("label.floors-apartment")
									: t("label.floors-house")}
							</span>
						</Form.Label>
						<div className="input-block input-border-radius-0 number-levels">
							<InputGroup.Prepend>
								<InputGroup.Text
									onClick={() => handleSubtractNumber("numberLevels")}
								>
									-
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control value={data.numberLevels} readOnly type="number" />
							<InputGroup.Append>
								<InputGroup.Text
									onClick={() => handleAddNumber("numberLevels")}
								>
									+
								</InputGroup.Text>
							</InputGroup.Append>
						</div>
					</InputGroup>
					{selectedProperty === "apartment" && (
						<InputGroup className="number-floors">
							<Form.Label>
								<span className="custom-label">{t("label.number-floors")}</span>
							</Form.Label>
							<div className="input-block input-border-radius-0 inside-floors">
								<InputGroup.Prepend>
									<InputGroup.Text
										onClick={() => handleSubtractNumber("numberFloors")}
									>
										-
									</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									value={data.numberFloors}
									readOnly
									type="number"
								/>
								<InputGroup.Append>
									<InputGroup.Text
										onClick={() => handleAddNumber("numberFloors")}
									>
										+
									</InputGroup.Text>
								</InputGroup.Append>
							</div>
						</InputGroup>
					)}
					{selectedProperty === "house" && (
						<InputGroup>
							<Form.Label>
								<img src={FacadesIcon} alt="FloorsIcon" />
								{t("label.facades")}
							</Form.Label>
							<div className="input-block input-border-radius-0 facades">
								<InputGroup.Prepend>
									<InputGroup.Text
										onClick={() => handleSubtractNumber("facadesNumber")}
									>
										-
									</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									value={data.facadesNumber}
									readOnly
									type="number"
								/>
								<InputGroup.Append>
									<InputGroup.Text
										onClick={() => handleAddNumber("facadesNumber")}
									>
										+
									</InputGroup.Text>
								</InputGroup.Append>
							</div>
						</InputGroup>
					)}
					<InputGroup>
						<Form.Label className="position-relative">
							<img src={BedroomsIcon} alt="BedroomsIcon" />
							{t("label.bedrooms")}
							<OverlayTrigger
								overlay={
									<Tooltip id="tooltip-info-second">
										{t("tooltip-info-second")}
									</Tooltip>
								}
							>
								<img
									className="tooltip-info"
									key="tooltip-info-second"
									src={TooltipIcon}
									alt="TooltipIcon"
								/>
							</OverlayTrigger>
						</Form.Label>
						<div className="input-block input-border-radius-0 bedrooms">
							<InputGroup.Prepend>
								<InputGroup.Text
									onClick={() => handleSubtractNumber("numberBedrooms")}
								>
									-
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								value={data.numberBedrooms}
								readOnly
								type="number"
							/>
							<InputGroup.Append>
								<InputGroup.Text
									onClick={() => handleAddNumber("numberBedrooms")}
								>
									+
								</InputGroup.Text>
							</InputGroup.Append>
						</div>
					</InputGroup>
					<InputGroup>
						<Form.Label>
							<img src={BathroomsIcon} alt="BathroomsIcon" />
							{t("label.bathrooms")}
						</Form.Label>
						<div className="input-block input-border-radius-0 bathrooms">
							<InputGroup.Prepend>
								<InputGroup.Text
									onClick={() => handleSubtractNumber("numberBathrooms")}
								>
									-
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								value={data.numberBathrooms}
								readOnly
								type="number"
							/>
							<InputGroup.Append>
								<InputGroup.Text
									onClick={() => handleAddNumber("numberBathrooms")}
								>
									+
								</InputGroup.Text>
							</InputGroup.Append>
						</div>
					</InputGroup>
				</Form.Row>
			</Form>
			<div className="steps-btn-group d-flex justify-content-between">
				<Button onClick={handleClickPrevBtn} className="prev-step">
					<img src={IconBack} alt="IconBack" />
					{t("button.back")}
				</Button>
				<Button
					disabled={disabled}
					onClick={handleClickNextBtn}
					className="next-step"
				>
					{t("button.next")}
				</Button>
			</div>
		</div>
	);
};

export default StepTwo;
