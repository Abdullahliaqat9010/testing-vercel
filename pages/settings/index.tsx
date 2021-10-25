import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Form, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import HeaderContainer from "../../containers/Header";
import FooterContainer from "../../containers/Footer";
import NavBarContainer from "../../containers/NavBar";

import NoPhoto from "../../assets/images/no-avatar.png";
import ArrowIcon from "../../assets/images/arrow-blue.svg";
import LockIcon from "../../assets/images/lock-icon-blue.svg";
import ValidPasswordIcon from "../../assets/images/valid.svg";
import AccountImage from "../../assets/images/account-image.png";
import { RootState } from "../../types/state";
import { UPDATE_USER_PROFILE } from "../../actions/actionTypes";
import { userLogoutAction } from "../../actions";
import { requireAuthentication } from "../../utils/requireAuthentication";

const SettingsPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { locale } = router;

	const { t } = useTranslation("settings-page");
	const [newPasswordData, setNewPasswordData] = useState({
		newPass: "",
		repeatNewPass: "",
	});
	const [validated, setValidated] = useState<boolean>(false);
	const [changePass, showChangePassBlock] = useState<boolean>(false);
	const [currentPassword, setCurrentPassword] = useState<string>("");
	const [isChangingPass, setIsChangingPass] = useState<boolean>(false);
	const [isPasswordMessageVisible, setIsPasswordMessageVisible] =
		useState<boolean>(false);
	const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
	const [isProfileMessageVisible, setIsProfileMessageVisible] =
		useState<boolean>(false);
	const [isAvatarUploading, setIsAvatarUploading] = useState<boolean>(false);
	const [isChangingNotification, setIsChangingNotification] =
		useState<boolean>(false);
	const [isNotificationMessageVisible, setIsNotificationMessageVisible] =
		useState<boolean>(false);
	const [isInvalidPass, setIsInvalidPass] = useState<boolean>(false);

	const _accountType = useSelector<RootState>(
		(state) => state.userInfo.account_type as string
	);
	const _firstname = useSelector<RootState>(
		(state) => state.userInfo.firstname as string
	);
	const _lastname = useSelector<RootState>(
		(state) => state.userInfo.lastname as string
	);
	const _phoneNumber = useSelector<RootState>(
		(state) => state.userInfo.phone_number as string
	);
	const email = useSelector<RootState>(
		(state) => state.userInfo.email
	) as string;
	const promo_mailing = useSelector<RootState>(
		(state) => state.userInfo.promo_mailing
	) as boolean;
	const avatar = useSelector<RootState>((state) => state.userInfo.avatar);
	const userId = useSelector<RootState>((state) => state.userInfo.id);

	const [firstname, setFirstname] = useState<string>(_firstname as string);
	const [lastname, setLastname] = useState<string>(_lastname as string);
	const [phoneNumber, setPhoneNumber] = useState<string>(
		_phoneNumber as string
	);

	const showChangePasswordBlock = () => {
		setNewPasswordData({ newPass: "", repeatNewPass: "" });
		showChangePassBlock(!changePass);
	};

	const handleChangePasswordValue = (
		el: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewPasswordData({
			...newPasswordData,
			[el.target.name]: el.target.value,
		});
	};

	const validNewPassword = () => {
		return (
			newPasswordData.newPass.length > 5 &&
			newPasswordData.repeatNewPass.length > 5 &&
			newPasswordData.newPass === newPasswordData.repeatNewPass
		);
	};

	const changePassword = async () => {
		try {
			setIsChangingPass(true);
			setIsInvalidPass(false);
			await axios.post(`auth/change-password`, {
				new_password: newPasswordData.newPass,
				password: currentPassword,
				token: localStorage.getItem("refresh_token"),
			});
			setNewPasswordData({ newPass: "", repeatNewPass: "" });
			setCurrentPassword("");
			setIsPasswordMessageVisible(true);
		} catch (error) {
			setIsInvalidPass(true);
		} finally {
			setIsChangingPass(false);
		}
	};

	const handleImageUpload = (image: File): Promise<string> => {
		return new Promise(async (res, rej) => {
			try {
				const formData = new FormData();
				formData.append("file", image);
				const { data } = await axios.post(`image-upload`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				res(data);
			} catch (error) {
				rej(error);
			}
		});
	};

	const updateAvatar = async (image: File) => {
		try {
			setIsAvatarUploading(true);
			const newAvatarUrl = await handleImageUpload(image);
			await axios.put(`user/${userId}`, {
				avatar: newAvatarUrl,
			});
			dispatch({
				type: UPDATE_USER_PROFILE,
				payload: {
					avatar: newAvatarUrl,
				},
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsAvatarUploading(false);
		}
	};

	const updateProfile = async () => {
		try {
			setIsUpdatingProfile(true);
			await axios.put(`/user/${userId}`, {
				firstname,
				lastname,
				phone_number: phoneNumber ? phoneNumber : undefined,
			});
			dispatch({
				type: UPDATE_USER_PROFILE,
				payload: {
					firstname,
					lastname,
					phoneNumber,
				},
			});
			setIsProfileMessageVisible(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsUpdatingProfile(false);
		}
	};

	const updateNotificationPreference = async (value) => {
		try {
			setIsChangingNotification(true);
			await axios.put(`user/${userId}`, {
				promo_mailing: value,
			});
			dispatch({
				type: UPDATE_USER_PROFILE,
				payload: {
					promo_mailing: value,
				},
			});
			setIsNotificationMessageVisible(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsChangingNotification(false);
		}
	};

	return (
		<>
			<HeaderContainer title={t("title")} />
			<div className="SettingsPage container">
				<NavBarContainer />
				<div className="SettingsPage__container w-100">
					<div className="first-block">
						<h1>{t("h1.title")}</h1>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
								updateProfile();
							}}
						>
							<Form.Group controlId="firstName">
								<Form.Label>{t("label.firstName")}</Form.Label>
								<Form.Control
									value={firstname}
									onChange={(e) => setFirstname(e.target.value)}
									required
									name="firstName"
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									{t("span.required")}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="lastName">
								<Form.Label>{t("label.lastName")}</Form.Label>
								<Form.Control
									value={lastname}
									onChange={(e) => setLastname(e.target.value)}
									required
									name="lastName"
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									{t("span.required")}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="email">
								<Form.Label>{t("label.email")}</Form.Label>
								<Form.Control
									value={email}
									disabled
									required
									name="email"
									type="email"
								/>
								<Form.Control.Feedback type="invalid">
									{t("span.required")}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="phone">
								<Form.Label>{t("label.phone")}</Form.Label>
								<Form.Control
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									//required
									name="phone"
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									{t("span.required")}
								</Form.Control.Feedback>
							</Form.Group>
							{/* <Form.Group
								controlId="gender"
								className="d-flex flex-column mb-0"
							>
								<Form.Label>Gender</Form.Label>
								<ButtonGroup defaultValue="m" className="custom-button-group">
									<Button value="m">Male</Button>
									<Button value="f">Female</Button>
									<Button value="others">Other</Button>
								</ButtonGroup>
							</Form.Group> */}
							<Button
								type="submit"
								disabled={isUpdatingProfile}
								style={{
									width: "150px",
									height: "50px",
									borderRadius: 8,
									marginTop: 10,
								}}
							>
								{isUpdatingProfile
									? t("button.loading")
									: t("button.save-chanes")}
							</Button>
							<Alert
								style={{ marginTop: 20 }}
								variant="success"
								dismissible
								show={isProfileMessageVisible}
								onClose={() => setIsProfileMessageVisible(false)}
							>
								{t("alert.save-changes")}
							</Alert>
						</Form>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
								changePassword();
							}}
						>
							<div className="password-block">
								<h2>{t("label.password")}</h2>
								<p>{t("p.password")}</p>
								{!changePass ? (
									<span
										className="change-pass"
										onClick={showChangePasswordBlock}
									>
										<img src={LockIcon} alt="LockIcon" />
										{t("link.change-password")}
									</span>
								) : (
									<div className="change-password-block">
										<Form.Group controlId="password">
											<Form.Label>{t("label.current-password")}</Form.Label>
											<Form.Control
												onChange={(e) => setCurrentPassword(e.target.value)}
												value={currentPassword}
												name="password"
												type="password"
												isInvalid={isInvalidPass}
											/>
											<Form.Control.Feedback type="invalid">
												{t("message.invalid-current-password")}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group controlId="new-pass">
											<Form.Label>{t("label.enter-new-password")}</Form.Label>
											<Form.Control
												onChange={handleChangePasswordValue}
												value={newPasswordData.newPass}
												name="newPass"
												type="password"
											/>
											{validNewPassword() && (
												<img src={ValidPasswordIcon} alt="ValidPasswordIcon" />
											)}
										</Form.Group>
										<Form.Group controlId="repeat-new-pass">
											<Form.Label>{t("label.repeat-password")}</Form.Label>
											<Form.Control
												onChange={handleChangePasswordValue}
												value={newPasswordData.repeatNewPass}
												name="repeatNewPass"
												type="password"
											/>
											{validNewPassword() && (
												<img src={ValidPasswordIcon} alt="ValidPasswordIcon" />
											)}
										</Form.Group>
										<div className="change-password-btns">
											<Button
												disabled={isChangingPass}
												className="confirm"
												type="submit"
											>
												{isChangingPass
													? t("button.loading")
													: t("button.confirm")}
											</Button>
											<Button
												className="cancel"
												onClick={showChangePasswordBlock}
											>
												{t("button.cancel")}
											</Button>
										</div>
										<Alert
											style={{ marginTop: 20 }}
											variant="success"
											dismissible
											show={isPasswordMessageVisible}
											onClose={() => setIsPasswordMessageVisible(false)}
										>
											{t("alert.change-password")}
										</Alert>
									</div>
								)}
							</div>
						</Form>
						<Form>
							<div className="notification-block">
								<h3>{t("label.notification")}</h3>
								<p>{t("p.notification")}</p>
								<Form.Group className="mb-0">
									<Form.Check
										type="checkbox"
										label={t("label.checkbox")}
										checked={promo_mailing}
										disabled={isChangingNotification}
										onChange={(e) =>
											updateNotificationPreference(e.target.checked)
										}
									/>
								</Form.Group>
								<Alert
									style={{ marginTop: -20 }}
									variant="success"
									dismissible
									show={isNotificationMessageVisible}
									onClose={() => setIsNotificationMessageVisible(false)}
								>
									{t("alert.success")}
								</Alert>
							</div>
						</Form>
					</div>
					{/* <div className="second-block">
						<div className="top-block d-flex">
							<img src={AccountImage} alt="AccountImage" />
							<div className="account-info d-flex flex-column">
								<span className="title">{t("label.pro")}</span>
								<span className="desc">{t("p.pro")}</span>
							</div>
						</div>
						<Button className="become-pro">{t("button.pro")}</Button>
					</div> */}
				</div>
				<div className="user-info-block">
					<div className="user-avatar">
						<img src={avatar ? avatar : NoPhoto} alt="NoPhoto" />
						<input
							onChange={(e) => {
								const files = e.target.files;
								if (files.length > 0) {
									updateAvatar(files[0]);
								}
							}}
							type="file"
							name="avatarFile"
							multiple={false}
							id="avatarFile"
							accept="image/x-png,image/gif,image/jpeg"
							className="inputAvatarfile"
						/>
						<label htmlFor="avatarFile">
							{isAvatarUploading
								? t("image.uploading")
								: avatar
								? t("image.change")
								: t("image.placholder")}
						</label>
						{/* <span className="upload-btn">Upload photo</span> */}
					</div>
					<div className="user-short-info">
						<span className="fullname">{`${_firstname} ${_lastname}`}</span>
						{_accountType === "agnet" && (
						 <span className="status">{t("acount-type")}</span>
						)}
					</div>
					<span
						onClick={() => {
							dispatch(userLogoutAction());
						}}
						className="logout"
					>
						{t("link.logout")} <img src={ArrowIcon} alt="ArrowIcon" />
					</span>
				</div>
			</div>
			<FooterContainer />
		</>
	);
};

export const getServerSideProps = requireAuthentication(async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, [
			"settings-page",
			"header",
			"common",
		])),
	},
}));

export default SettingsPage;
