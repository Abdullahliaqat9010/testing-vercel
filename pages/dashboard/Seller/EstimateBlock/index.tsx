import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";

import {
	Button,
	ButtonGroup,
	FormControl,
	InputGroup,
	OverlayTrigger,
	Spinner,
	Tooltip,
} from "react-bootstrap";

import SuccessImage from "../../../../assets/images/success.png";
import { estimationButtonsList } from "../../../../templates/estimationButtonsList";

const EstimateBlock = ({ estimation, mainProperty }) => {
	const { t } = useTranslation("dashboard-page");
	const dispatch = useDispatch();

	const showTitle = (btnName: string) => {
		return btnName.toLowerCase();
	};

	const numberWithCommas = (value: string) => {
		if (value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		return "";
	};

	const [activeBtn, setActiveBtn] = useState<string>("");
	const [priceValue, setPriceValue] = useState({
		min: null,
		max: null,
		minPerMeter: null,
		maxPerMeter: null,
	});

	const [estimationForm, setEstimationForm] = useState({
		myEstimation: "",
		myEstimationFeedback: "",
	});

	const [estimationPopup, setEstimationPopup] = useState<boolean>(false);
	const [thanksPopup, setThanksPopup] = useState<boolean>(false);

	useEffect(() => {
		if (estimation?.totalValue && mainProperty.live_area) {
			const min = estimation.min;
			const max = estimation.max;

			setPriceValue({
				min: estimation.min,
				max: estimation.max,
				minPerMeter: Math.round(min / mainProperty.live_area),
				maxPerMeter: Math.round(max / mainProperty.live_area),
			});

			setEstimationForm({
				myEstimation: numberWithCommas(estimation?.totalValue.toString()),
				myEstimationFeedback: `${t("placeholder.property-has")} ${showTitle(
					t("button." + activeBtn)
				)} ${t("placeholder.price-because")}...`,
			});
		}
	}, [estimation, activeBtn]);

	const showEstimationPopup = (btnId: string) => {
		if (!thanksPopup) {
			setActiveBtn(btnId);
			setEstimationPopup(true);
		}
		return false;
	};

	const nextStepPopup = () => {
		setEstimationPopup(false);
		setThanksPopup(true);
	};

	const closePopups = () => {
		setActiveBtn("");
		setThanksPopup(false);
	};

	const handleUpdatePrice = (el: React.ChangeEvent<HTMLInputElement>) => {
		setEstimationForm({
			...estimationForm,
			[el.target.name]: el.target.value,
		});
	};

	return (
		<div className="estimate-block">
			<h2 className="h4">{t("title.estimated-value")}</h2>
			<p>{mainProperty?.search_address}</p>
			{mainProperty?.search_address && (
				<div className="scale-block">
					{estimation?.totalValue ? (
						<OverlayTrigger
							key="tooltip"
							placement="top"
							show
							overlay={
								<Tooltip id="price-block">
									<span>
										€{numberWithCommas(estimation?.totalValue.toString())}
									</span>
									<span className="gray">
										€{numberWithCommas(estimation?.pricePerM.toString())} per m²
									</span>
								</Tooltip>
							}
						>
							<div className="line" />
						</OverlayTrigger>
					) : (
						<Spinner animation="border" variant="primary" />
					)}
					<div className="range d-flex justify-content-between">
						<div className="min">
							{priceValue.min && (
								<span>€{numberWithCommas(priceValue.min.toString())}</span>
							)}
							{priceValue.minPerMeter && (
								<span className="gray">
									€{numberWithCommas(priceValue.minPerMeter.toString())} per m²
								</span>
							)}
						</div>
						<div className="max">
							{priceValue.max && (
								<span>€{numberWithCommas(priceValue.max.toString())}</span>
							)}
							{priceValue.maxPerMeter && (
								<span className="gray">
									€{numberWithCommas(priceValue.maxPerMeter.toString())} per m²
								</span>
							)}
						</div>
					</div>
					<div className="btn-block">
						<span className="btn-block__title w-100">
							{t("title.accurate-estimation")}
						</span>
						<ButtonGroup size="lg" className="w-100">
							{estimationButtonsList.map((item, index) => (
								<Button
									key={index}
									className={activeBtn === item.id ? "custom-active" : ""}
									onClick={() => showEstimationPopup(item.id)}
								>
									{t(`button.${item.id}`)}
								</Button>
							))}
						</ButtonGroup>
					</div>
				</div>
			)}

			{estimationPopup && (
				<div className="estimation-popup">
					<p className="estimation-popup__title">
						{t("label.what-your-estimation")}
					</p>
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text className="ico">€</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							className="border-left-0"
							name="myEstimation"
							value={estimationForm.myEstimation}
							onChange={handleUpdatePrice}
						/>
					</InputGroup>
					<p className="estimation-popup__title">
						{t("label.feedback-or-comments")}
					</p>
					<FormControl
						as="textarea"
						name="myEstimationFeedback"
						rows={5}
						onChange={handleUpdatePrice}
						value={estimationForm.myEstimationFeedback}
					/>
					<Button onClick={nextStepPopup} className="confirm">
						{t("button.confirm")}
					</Button>
				</div>
			)}
			{thanksPopup && (
				<div className="thanks-for-reply d-flex flex-column align-items-center">
					<img src={SuccessImage} alt="SuccessImage" />
					<span className="thanks-for-reply__title">
						{t("title.thanks-reply")}
					</span>
					<span className="thanks-for-reply__desc">
						{t("desc.thanks-reply")}
					</span>
					<Button onClick={closePopups}>{t("button.close")}</Button>
				</div>
			)}
		</div>
	);
};

export default EstimateBlock;
