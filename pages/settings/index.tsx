import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Form, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";

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
import { GetServerSideProps, GetStaticProps } from "next";
import { userLogoutAction } from "../../actions";
import { requireAuthentication } from "../../utils/requireAuthentication";

const SettingsPage = () => {
	const dispatch = useDispatch();

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
	const [isInvalidPass, setIsInvalidPass] = useState<boolean>(false);

	const _firstname = useSelector<RootState>(
		(state) => state.userInfo.userName as string
	);
	const _lastname = useSelector<RootState>(
		(state) => state.userInfo.userSurname as string
	);
	const _phoneNumber = useSelector<RootState>(
		(state) => state.userInfo.userPhone as string
	);
	const email = useSelector<RootState>(
		(state) => state.userInfo.userEmail
	) as string;
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
				formData.append("upload", image);
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
			await axios.put(`users/${userId}`, {
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
			await axios.put(`/users/${userId}`, {
				firstname,
				lastname,
				phone_number: phoneNumber ? phoneNumber : undefined,
			});
			dispatch({
				type: UPDATE_USER_PROFILE,
				payload: {
					userName: firstname,
					userSurname: lastname,
					userPhone: phoneNumber,
				},
			});
			setIsProfileMessageVisible(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsUpdatingProfile(false);
		}
	};

	return (
		<>
			<HeaderContainer title="Account Settings" />
			<div className="SettingsPage container">
				<NavBarContainer />
				<div className="SettingsPage__container w-100">
					<div className="first-block">
						<h1>Profile details</h1>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
								updateProfile();
							}}
						>
							<Form.Group controlId="firstName">
								<Form.Label>First name</Form.Label>
								<Form.Control
									value={firstname}
									onChange={(e) => setFirstname(e.target.value)}
									required
									name="firstName"
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									required
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="lastName">
								<Form.Label>Last name</Form.Label>
								<Form.Control
									value={lastname}
									onChange={(e) => setLastname(e.target.value)}
									required
									name="lastName"
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									required
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									value={email}
									disabled
									required
									name="email"
									type="email"
								/>
								<Form.Control.Feedback type="invalid">
									required
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="phone">
								<Form.Label>Phone number</Form.Label>
								<Form.Control
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									//required
									name="phone"
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									required
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
								style={{ padding: "14px 51px", borderRadius: 8, marginTop: 10 }}
							>
								{isUpdatingProfile ? "Loading..." : "Save changes"}
							</Button>
							<Alert
								style={{ marginTop: 20 }}
								variant="success"
								dismissible
								show={isProfileMessageVisible}
								onClose={() => setIsProfileMessageVisible(false)}
							>
								Profile has been updated successfully!
							</Alert>
						</Form>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
								changePassword();
							}}
						>
							<div className="password-block">
								<h2>Password</h2>
								<p>
									We strongly recommend to use strong password, with at least
									one symbol and digit.
								</p>
								{!changePass ? (
									<span
										className="change-pass"
										onClick={showChangePasswordBlock}
									>
										<img src={LockIcon} alt="LockIcon" />
										Change password
									</span>
								) : (
									<div className="change-password-block">
										<Form.Group controlId="password">
											<Form.Label>Current password</Form.Label>
											<Form.Control
												onChange={(e) => setCurrentPassword(e.target.value)}
												value={currentPassword}
												name="password"
												type="password"
												isInvalid={isInvalidPass}
											/>
											<Form.Control.Feedback type="invalid">
												Invalid current password
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group controlId="new-pass">
											<Form.Label>Enter new password</Form.Label>
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
											<Form.Label>Repeat new password</Form.Label>
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
												{isChangingPass ? "Loading..." : "Confirm"}
											</Button>
											<Button
												className="cancel"
												onClick={showChangePasswordBlock}
											>
												Cancel
											</Button>
										</div>
										<Alert
											style={{ marginTop: 20 }}
											variant="success"
											dismissible
											show={isPasswordMessageVisible}
											onClose={() => setIsPasswordMessageVisible(false)}
										>
											Password has been changed successfully!
										</Alert>
									</div>
								)}
							</div>
						</Form>
						<Form>
							<div className="notification-block">
								<h3>Notifications</h3>
								<p>
									Please check if you like to be notified about system updates,
									new estimations.
								</p>
								<Form.Group className="mb-0">
									<Form.Check
										type="checkbox"
										label="I allow Immo Belgium to send me updates about my market."
									/>
								</Form.Group>
							</div>
						</Form>
					</div>
					<div className="second-block">
						<div className="top-block d-flex">
							<img src={AccountImage} alt="AccountImage" />
							<div className="account-info d-flex flex-column">
								<span className="title">Pro Account</span>
								<span className="desc">
									Are you interested in becoming a PRO user?
								</span>
							</div>
						</div>
						<Button className="become-pro">Become PRO</Button>
					</div>
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
								? "Uploading..."
								: avatar
								? "Change Photo"
								: "Upload Photo"}
						</label>
						{/* <span className="upload-btn">Upload photo</span> */}
					</div>
					<div className="user-short-info">
						<span className="fullname">{`${_firstname} ${_lastname}`}</span>
						<span className="status">Professional</span>
					</div>
					<span
						onClick={() => {
							dispatch(userLogoutAction());
						}}
						className="logout"
					>
						Log out <img src={ArrowIcon} alt="ArrowIcon" />
					</span>
				</div>
			</div>
			<FooterContainer />
		</>
	);
};

export const getServerSideProps = requireAuthentication(async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ["header", "common"])),
	},
}));

export default SettingsPage;
