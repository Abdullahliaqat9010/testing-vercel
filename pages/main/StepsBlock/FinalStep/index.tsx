import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import ArrowIcon from "../../../../assets/images/arrow-blue.svg";

import {
	checkIfEmailExistAction,
	sendStepsDataRequestAction,
	setUserDataAction,
} from "../../../../actions";
import { RootState } from "../../../../types/state";

import IconBack from "../../../../assets/images/long-arrow.svg";
import { generatePropertyData } from "../../../../utils/generatePropertyData";
import { regexp } from "../../../../utils";

const FinalStep = ({ handleSwitchSteps }: any) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { t } = useTranslation("steps");
	const dispatch = useDispatch();
	const router = useRouter();
	const { locale } = router;
	const {
		addressFromStepOne,
		additionalAddress,
		location,
		selectedProperty,
		propertyDetails,
		details,
		utilities,
		personalAccount,
	} = useSelector((state: RootState) => state.stepsInfo.stepBlock);
	const { existEmail } = useSelector((state: RootState) => state.userInfo);

	const [data, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone_number: "+33",
		password: "",
		confirmPassword: "",
		promotions: false,
		agreement: false,
	});

	const [errors, setErrors] = useState({
		noValid: false,
		firstName: "",
		lastName: "",
		email: "",
		phone_number: "",
		password: "",
		confirmPassword: "",
		agreement: "",
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (existEmail && data.email.length > 0) {
			setErrors({
				...errors,
				email: t("error.email-exists"),
			});
		}
	}, [existEmail]);

	const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...data,
			[el.target.name]: el.target.value,
		});

		setErrors({
			...errors,
			[el.target.name]: "",
		});
	};

	const handleChecked = (el: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...data,
			[el.target.name]: el.target.checked,
		});
	};

	const propertyData = () => {
		return {
			owner: Boolean(personalAccount.selectedItem === "homeowner"),
			interest: String(personalAccount.sellProperty),
			selling_way: String(personalAccount.howSell).length
				? String(personalAccount.howSell)
				: undefined,
			residence_type: String(personalAccount.selectedResidence),
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
	};

	const handleSubmit = () => {
		if (isDisabled()) {
			setIsLoading(true);
			const newData = {
				...data,
				phone_number: data.phone_number.length > 0 ? data.phone_number : null,
			};
			dispatch(setUserDataAction(newData));
			dispatch(
				sendStepsDataRequestAction({
					property: propertyData(),
					user: { ...newData },
					locale,
				})
			);
			// console.log(JSON.stringify(propertyData()));
			// console.log(newData);
		}
		return false;
	};

	const isDisabled = () => {
		if (
			data.firstName.length === 0 ||
			data.lastName.length === 0 ||
			data.password.length === 0 ||
			data.confirmPassword.length === 0 ||
			data.email.length === 0
		) {
			setErrors({
				noValid: true,
				firstName: data.firstName.length > 0 ? "" : t("error.required"),
				lastName: data.lastName.length > 0 ? "" : t("error.required"),
				password: data.password.length > 0 ? "" : t("error.required"),
				confirmPassword:
					data.confirmPassword.length > 0 ? "" : t("error.required"),
				email: data.email.length > 0 ? "" : t("error.required"),
				agreement: "",
				phone_number: "",
			});
			return false;
		}

		if (data.password.length < 5 || data.confirmPassword.length < 5) {
			setErrors({
				...errors,
				noValid: true,
				password: data.password.length < 5 ? t("error.more-then-5") : "",
				confirmPassword:
					data.confirmPassword.length < 5 ? t("error.more-then-5") : "",
			});
			return false;
		}

		if (
			!data.firstName.match(regexp.name) ||
			!data.lastName.match(regexp.name)
		) {
			setErrors({
				...errors,
				noValid: true,
				firstName: !data.firstName.match(regexp.name)
					? t("error.only-latter")
					: "",
				lastName: !data.lastName.match(regexp.name)
					? t("error.only-latter")
					: "",
			});
			return false;
		}

		if (
			!data.password.match(regexp.password) ||
			!data.confirmPassword.match(regexp.password)
		) {
			setErrors({
				...errors,
				noValid: true,
				password: !data.password.match(regexp.password)
					? t("error.password")
					: "",
				confirmPassword: !data.confirmPassword.match(regexp.password)
					? t("error.password")
					: "",
			});
			return false;
		}

		if (data.password !== data.confirmPassword) {
			setErrors({
				...errors,
				noValid: true,
				confirmPassword: t("error.dont-match"),
			});
			return false;
		}
		return true;
	};

	const handleClickPrevBtn = () => {
		handleSwitchSteps();
	};

	const checkIfEmailExist = (value: string) => {
		dispatch(checkIfEmailExistAction(value));
	};

	const goToLogin = () => {
		window.sessionStorage.setItem(
			"forgotLogin",
			JSON.stringify(propertyData())
		);
		router.push("/login");
	};
	const validatePasword = (value) => {
		if(!value.match(regexp.phone)) {
			setErrors({
				...errors,
				phone_number: t("error.phone-notValid")
			});
			return false;
		}
	}
	const validateEmail= async (value)=>{
		console.log("hasd", value)
		if ( data.email === "") {
			setErrors({
				...errors,
				email: t("error.required")
			});
			return false;
		}else if(!data.email.match(regexp.email)) {
			setErrors({
				...errors,
				email:  t("error.email-notValid")
			});
			return false;
		}
		checkIfEmailExist(value)
		// return true
	}

	return (
		<div className="final-step">
			<span className="step-title">{t("title.good-job")}</span>
			<h4>{t("title.estimation-ready")}</h4>
			<span className="step-desc">{t("desc.finalized-estimation")}</span>
			<span className="have-account" onClick={goToLogin}>
				{t("link.already-have-account")}
				<img src={ArrowIcon} alt="ArrowIcon" />
			</span>
			<Form validated={errors.noValid}>
				<Form.Row className="mb-4">
					<Form.Group>
						<Form.Label>{t("label.first-name")}</Form.Label>
						<Form.Control
							value={data.firstName}
							name="firstName"
							required
							minLength={2}
							maxLength={60}
							onChange={handleChangeVal}
							type="text"
							isInvalid={errors.firstName.length > 0}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.firstName}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>{t("label.last-name")}</Form.Label>
						<Form.Control
							value={data.lastName}
							name="lastName"
							required
							minLength={2}
							maxLength={60}
							onChange={handleChangeVal}
							type="text"
							isInvalid={errors.lastName.length > 0}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.lastName}
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>
				<Form.Group className="mb-4">
					<Form.Label>{t("label.email")}</Form.Label>
					<Form.Control
						value={data.email}
						name="email"
						required
						onBlur={(el) => validateEmail(el.target.value)}
						// onBlur={(el) => checkIfEmailExist(el.target.value)}
						onChange={handleChangeVal}
						type="text"
						isInvalid={errors.email.length > 0}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.email}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-4">
					<Form.Label>
						{t("label.phone")}({t("title.optional")})
					</Form.Label>
					<Form.Control
						value={data.phone_number}
						name="phone_number"
						onBlur= {(el) => validatePasword(el.target.value)}
						onChange={handleChangeVal}
						type="text"
						isInvalid={errors.phone_number.length > 0}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.phone_number}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Row>
					<Form.Group>
						<Form.Label>{t("label.password")}</Form.Label>
						<Form.Control
							value={data.password}
							name="password"
							required
							minLength={5}
							isInvalid={errors.password.length > 0}
							onChange={handleChangeVal}
							type="password"
						/>
						<Form.Control.Feedback type="invalid">
							{errors.password}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>{t("label.confirm-password")}</Form.Label>
						<Form.Control
							value={data.confirmPassword}
							name="confirmPassword"
							required
							minLength={5}
							isInvalid={errors.confirmPassword.length > 0}
							onChange={handleChangeVal}
							type="password"
						/>
						<Form.Control.Feedback type="invalid">
							{errors.confirmPassword}
						</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>
				<span className="recommendation">{t("desc.strongly-recommend")}</span>
				<Form.Check
					checked={data.promotions}
					name="promotions"
					onChange={handleChecked}
					label={t("label.promotions")}
				/>
				<div className="d-flex">
					<Form.Check
						checked={data.agreement}
						name="agreement"
						//required
						onChange={handleChecked}
						label={
							<Form.Label className="fs-16">
								{t("label.read-privacy")}
								<a href={locale + "/privacy-policy"} target="_blank">
									{t("label.privacy")}
								</a>
								{t("label.and")}
								<a href={locale + "/terms-and-condition"} target="_blank">
									{t("label.terms")}
								</a>
							</Form.Label>
						}
					/>
				</div>
			</Form>
			<div className="steps-btn-group d-flex justify-content-between">
				<Button onClick={handleClickPrevBtn} className="prev-step">
					<img src={IconBack} alt="IconBack" />
					{t("button.back")}
				</Button>
				<Button
					disabled={isLoading || !data.agreement}
					className="next-step"
					onClick={handleSubmit}
				>
					{isLoading ? `${t("button.loading")}...` : t("button.create-account")}
				</Button>
			</div>
		</div>
	);
};

export default FinalStep;
