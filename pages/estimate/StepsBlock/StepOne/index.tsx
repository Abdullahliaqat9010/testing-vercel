import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import GoogleMap from "../../../../components/GoogleMap";

import {
	clearAutocompleteItems,
	getAutocompleteItemsAction,
	goToNextStepAction,
	openMainStepsAction,
	setActivePropertyAction,
	setAdditionalAddressAction,
} from "../../../../actions";
import { RootState } from "../../../../types/state";

import HomeImageActive from "../../../../assets/images/home-active.svg";
import HomeImageNoActive from "../../../../assets/images/home-noactive.svg";
import ApartmentImageActive from "../../../../assets/images/apartment-active.svg";
import ApartmentImageNoActive from "../../../../assets/images/apartment-noactive.svg";
// import LandImageActive from '../../../../assets/images/land-active.svg';
// import LandImageNoActive from '../../../../assets/images/land-noactive.svg';
import MarkerImage from "../../../../assets/images/marker-blue.svg";
import CloseIcon from "../../../../assets/images/close-icon.svg";

const StepOne = ({ setStep }) => {
	const { t, i18n } = useTranslation("steps");
	const dispatch = useDispatch();
	const { locale } = useRouter();

	// useEffect(() => {
	// 	console.log(locale);
	// 	console.log(t("span.step"));
	// 	console.log(i18n.language);
	// }, [locale]);

	const { street, number, locality, zip } = useSelector(
		(state: RootState) => state.stepsInfo.stepBlock.additionalAddress
	);
	const { addressFromStepOne, selectedProperty: currentProp } = useSelector(
		(state: RootState) => state.stepsInfo.stepBlock
	);
	const { dataFromMapBox } = useSelector((state: RootState) => state.stepsInfo);
	const [selectedProperty, setCurrentProperty] = useState<string>(currentProp);
	const [showMapBlock, setShowMapBlock] = useState<boolean>(false);
	const [showAddressBlock, changeAddressBlockState] = useState<boolean>(true);

	const [autoCompleteList, showAutoCompleteList] = useState({
		street: false,
		locality: false,
	});

	const [data, setFormData] = useState({
		street,
		number,
		zip,
		locality,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [error, setError] = useState({ zip: "" });

	const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...data,
			[el.target.name]:
				+el.target.value < 0 ? +el.target.value * -1 : el.target.value,
		});
	};

	const handleUpdateInput = (el: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...data,
			[el.target.name]: el.target.value,
		});

		showAutoCompleteList({
			...autoCompleteList,
			[el.target.name]: true,
			locality: false,
		});

		if (el.target.value.length > 0) {
			const type = el.target.name === "locality" ? "place" : "address";
			dispatch(getAutocompleteItemsAction(el.target.value, type));
		} else {
			dispatch(clearAutocompleteItems());
		}
	};

	const setNewLocality = (locality: string) => {
		setFormData({ ...data, locality });
		showAutoCompleteList({
			...autoCompleteList,
			locality: false,
		});

		dispatch(clearAutocompleteItems());
	};

	const setNewAddress = (id: string) => {
		const [data] = dataFromMapBox.filter((item) => item.id === id);

		setFormData({
			locality: data.locality.length > 1 ? data.locality : data.place,
			number: data.number,
			street: data.street,
			zip: data.postcode,
		});

		const dataForNextStep = {
			locality: data.locality.length > 1 ? data.locality : data.place,
			number: data.number,
			street: data.street,
			zip: data.postcode,
			country: data.country,
		};

		const sendData = {
			location: { ...data.location },
			infoFromAutoComplete: data.fullAddress,
			additionalAddress: { ...dataForNextStep },
		};

		dispatch(openMainStepsAction(sendData));

		showAutoCompleteList({
			...autoCompleteList,
			street: false,
		});
		dispatch(clearAutocompleteItems());
	};

	const handleClickNextBtn = () => {
		if (!disabledButton()) {
			dispatch(setAdditionalAddressAction(data));
			setStep(1);
		}
		return false;
	};

	const setActiveBlock = (item: string) => {
		setCurrentProperty(item);
		dispatch(setActivePropertyAction(item));
	};

	const disabledButton = () => {
		if (!data.street.length) {
			return true;
		}
		if (!data.locality.length) {
			return true;
		}
		if (!data.number.length) {
			return true;
		}
		if (!selectedProperty.length) {
			return true;
		}

		return !data.zip.length;
	};

	const showMap = () => {
		changeAddressBlockState(true);
		setShowMapBlock(!showMapBlock);
	};

	const closeAddressBlock = () => {
		changeAddressBlockState(false);
	};

	const getAddress = async (el: React.ChangeEvent<HTMLInputElement>) => {
		if (
			el.target.name === "zip" &&
			(+el.target.value < 1000 || +el.target.value > 9999)
		) {
			setError({ ...error, zip: t("error.zip") });
		}
	};

	return (
		<div className="step-one ">
			<span className="step-title">{t("span.step")} 1</span>
			<h4>{t("title.address")}</h4>
			
			<Form>
				<Form.Row>
					<Form.Group
						className="position-relative"
						id="street"
						controlId="street"
					>
						<Form.Label>{t("label.street")}</Form.Label>
						<Form.Control
							name="street"
							value={data.street}
							autoComplete="off"
							onChange={handleUpdateInput}
						/>
						{dataFromMapBox.length > 0 && autoCompleteList.street && (
							<ul className="autocomplete-list">
								{dataFromMapBox.map((item, index) => (
									<li onClick={() => setNewAddress(item.id)} key={index}>
										{item.fullAddress}
									</li>
								))}
							</ul>
						)}
					</Form.Group>
					<Form.Group controlId="number">
						<Form.Label>№</Form.Label>
						<Form.Control
							type="number"
							min={1}
							name="number"
							value={data.number}
							onChange={handleChangeVal}
						/>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group className="mr-3 custom-styles" controlId="zip">
						<Form.Label>{t("label.zip")}</Form.Label>
						<Form.Control
							type="number"
							min={1000}
							max={9999}
							name="zip"
							value={data.zip}
							onChange={handleChangeVal}
							onBlur={getAddress}
						/>
						{error.zip.length > 0 && <span className="error">{error.zip}</span>}
					</Form.Group>
					<Form.Group className="position-relative" controlId="locality">
						<Form.Label>{t("label.locality")}</Form.Label>
						<Form.Control
							name="locality"
							autoComplete="off"
							value={data.locality}
							onChange={handleUpdateInput}
						/>
						{dataFromMapBox.length > 0 && autoCompleteList.locality && (
							<ul className="autocomplete-list">
								{dataFromMapBox.map((item, index) => (
									<li
										onClick={() => setNewLocality(item.fullAddress)}
										key={index}
									>
										{item.fullAddress}
									</li>
								))}
							</ul>
						)}
					</Form.Group>
				</Form.Row>
			</Form>
			{isMobile && (
				<span className="pick-on-map" onClick={showMap}>
					<img src={MarkerImage} alt="marker" />
					{t("span.pick-on-map")}
				</span>
			)}
			<h5>{t("title.property-type")}</h5>
			<div className="properties d-flex justify-content-between">
				<div
					onClick={() => setActiveBlock("house")}
					className={`property-home ${
						selectedProperty === "house" ? "active" : ""
					}`}
				>
					<img
						src={
							selectedProperty === "house" ? HomeImageActive : HomeImageNoActive
						}
						alt="house"
					/>
					<span className="title">{t("select.house")}</span>
					<div className="active-item" />
				</div>
				<div
					onClick={() => setActiveBlock("apartment")}
					className={`property-apartment ${
						selectedProperty === "apartment" ? "active" : ""
					}`}
				>
					<img
						src={
							selectedProperty === "apartment"
								? ApartmentImageActive
								: ApartmentImageNoActive
						}
						alt="apartment"
					/>
					<span className="title">{t("select.apartment")}</span>
					<div className="active-item" />
				</div>
				{/*<div*/}
				{/*  onClick={ () => setActiveBlock('land') }*/}
				{/*  className={ `property-land ${ selectedProperty === 'land' ? 'active' : '' }` }*/}
				{/*>*/}
				{/*  <img src={ selectedProperty === 'land' ? LandImageActive : LandImageNoActive } alt="land"/>*/}
				{/*  <span className="title">Land</span>*/}
				{/*  <div className="active-item"/>*/}
				{/*</div>*/}
			</div>
			<Button
				disabled={disabledButton()}
				onClick={handleClickNextBtn}
				type="submit"
				// className="next-step"
			>
				{t("button.next")}
			</Button>
			{isMobile && showMapBlock && (
				<div className="mobile-map">
					{showAddressBlock && (
						<div className="address-block">
							<span>{addressFromStepOne}</span>
							<img
								onClick={closeAddressBlock}
								src={CloseIcon}
								alt="CloseIcon"
							/>
						</div>
					)}
					<GoogleMap />
					<span className="close-map" onClick={showMap}>
						{t("button.close")}
					</span>
				</div>
			)}
		</div>
	);
};

export default StepOne;
