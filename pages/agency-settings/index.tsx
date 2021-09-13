import React, { useEffect } from "react";
import { Upload, message } from "antd";
import {
	FacebookFilled,
	InboxOutlined,
	InstagramFilled,
	LinkedinFilled,
	TwitterCircleFilled,
	YoutubeFilled,
} from "@ant-design/icons";
import { QuestionCircleFilled } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeaderContainer from "../../containers/Header";
import { useTranslation } from "react-i18next";
import NavBarContainer from "../../containers/NavBar";
import UploadImage from "../../assets/images/upload-img.svg";
import UploadPicture from "../../assets/images/upload-picture.svg";
import * as Yup from "yup";

const { Dragger } = Upload;

const TagInput = ({ tags, setTags }) => {
	const [tagData, setTagData] = React.useState(tags);
	const removeTagData = (indexToRemove: number) => {
		setTagData([
			...tagData.filter((_: string, index: number) => index !== indexToRemove),
		]);
	};
	const addTagData = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value !== "") {
			setTagData([...tagData, event.target.value]);
			event.target.value = "";
		}
	};

	useEffect(() => {
		setTags(tagData);
	}, [tagData]);

	return (
		<div className="tag-input">
			<ul className="tags">
				{tagData.map((tag: string, index: number) => (
					<li key={index} className="tag">
						<span className="tag-title">{tag}</span>
						<span
							className="tag-close-icon"
							onClick={() => removeTagData(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>

			<input
				type="text"
				onKeyUp={(event: any) =>
					event.key === "Enter" ? addTagData(event) : null
				}
			/>
		</div>
	);
};

const Formpage = () => {
	const draggerProps = {
		name: "file",
		multiple: true,

		onChange: (info) => {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop: (e) => {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};

	const { t } = useTranslation();
	return (
		<div>
			<Formik
				initialValues={{
					facebookUrl: "",
					instagramUrl: "",
					twitterUrl: "",
					linkedinUrl: "",
					youtubeUrl: "",
					languages: [],
					notificationEmails: [],
					profilePic: "",
					coverPic: "",
				}}
				// validationSchema={SignupSchema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<HeaderContainer title={t("title")} />
						<div className="AgencySettingsPage container d-flex">
							<NavBarContainer />
							<div className="AgencySettingsPage__container w-100">
								<div className="first-block">
									<h1>{"Votre vitrine"}</h1>
									<div>
										Votre vitrine présente votre savoir-faire auprès de
										L'ensemble des visiteurs du site Meneur. Agen., acheteurs et
										vendeurs. Comp... un in.iinurn d'in.rrnations et nuit.% vos
										atts °lien. et biens vendus en avant pour mettre en valeur
										votre expertise.
									</div>

									<div className="password-block2">
										<div className="photo-container">
											<div>
												<h2>{"Photo d’en-tete"}</h2>
												<div>
													La photo de votre vitrine est un reflet de votre
													professionnaLisme. PersonnaLisez-la Le pLus rapidement
													possible avec une photo de votre agence (vitrine ou
													intérieur).
												</div>
											</div>
											<div className="user-info-block">
												<Dragger {...draggerProps} className="w-100">
													<div className="Dragger">
														<div className="child-Dragger">
															<p>
																<img src={UploadImage} alt="LogoFooter" />
															</p>

															<div className="d-flex justify-content-center">
																<button>
																	<img src={UploadPicture} alt="LogoFooter" />
																	<div className="upload">Upload</div>
																</button>
															</div>
														</div>
													</div>
												</Dragger>
											</div>
										</div>
										<div className="alert-block">
											<QuestionCircleFilled color={"#d3d3d3"} />
											<div className="text-block">
												Astuce: Pour un rendu optimal prenez une photo de votre
												agence avec votre smartphone en position horizontale. La
												dImension idêale de la photo est de 1135 pixels de
												largeur et 350 pl.. de hauteur.
											</div>
										</div>
										<Dragger {...draggerProps}>
											<div className="Dragger">
												<div className="child-Dragger">
													<p className="ant-upload-drag-icon">
														<img src={UploadImage} alt="LogoFooter" />
													</p>
													<p className="upload-text">
														Drag’n’drop to upload your cover image or click
													</p>
													<div className="d-flex justify-content-center">
														<button>
															<img src={UploadPicture} alt="LogoFooter" />
															<div className="upload">Upload</div>
														</button>
													</div>
												</div>
											</div>
										</Dragger>
										<div className="password-block2">
											<h2>Socials</h2>
											<div className="social-container">
												<FacebookFilled
													style={{ fontSize: 35, color: "#8F99B4" }}
												/>

												<Field
													className="input-field"
													type="url"
													name="facebookUrl"
													value={values.facebookUrl}
													placeholder={"https://facebook.com/yourcompany"}
												/>
											</div>
											<div className="social-container">
												<TwitterCircleFilled
													style={{ fontSize: 35, color: "#8F99B4" }}
												/>

												<Field
													className="input-field"
													type="url"
													name="twitterUrl"
													value={values.twitterUrl}
													placeholder={"https://twitter.com/yourcompany"}
												/>
											</div>
											<div className="social-container">
												<InstagramFilled
													style={{ fontSize: 35, color: "#8F99B4" }}
												/>

												<Field
													className="input-field"
													type="url"
													name="instagramUrl"
													value={values.instagramUrl}
													placeholder={"https://instagram.com/yourcompany"}
												/>
											</div>
											<div className="social-container">
												<LinkedinFilled
													style={{ fontSize: 35, color: "#8F99B4" }}
												/>

												<Field
													className="input-field"
													type="url"
													name="linkedinUrl"
													value={values.linkedinUrl}
													placeholder={"https://linkedin.com/yourcompany"}
												/>
											</div>
											<div className="social-container">
												<YoutubeFilled
													style={{ fontSize: 35, color: "#8F99B4" }}
												/>

												<Field
													className="input-field"
													type="url"
													name="youtubeUrl"
													value={values.youtubeUrl}
													placeholder={"https://youtube.com/yourcompany"}
												/>
											</div>
										</div>
										<div className="password-block2">
											<h2>Languages</h2>
											<div className="pb-3 pt-1 small">
												Please select any that apply.
											</div>
											<div
												role="group"
												aria-labelledby="checkbox-group"
												style={{ width: "100%" }}
											>
												<div className="d-flex flex-row align-items-center">
													<div className="w-50">
														<div className="w-25 my-2 d-flex align-items-center">
															<Field
																type="checkbox"
																name="languages"
																value="Arabe"
															/>
															<label className="ml-2" htmlFor="Arabe">
																Arabe
															</label>
														</div>
														<div className="w-25 my-2 d-flex align-items-center">
															<Field
																type="checkbox"
																name="languages"
																value="Allemand"
															/>
															<label className="ml-2" htmlFor="Allemand">
																Allemand
															</label>
														</div>
														<div className="w-25 my-2 d-flex align-items-center">
															<Field
																type="checkbox"
																name="languages"
																value="Coreen"
															/>
															<label className="ml-2" htmlFor="Coreen">
																Coreen
															</label>
														</div>
														<div className="w-25 my-2 d-flex align-items-center">
															<Field
																type="checkbox"
																name="languages"
																value="Hebreu"
															/>
															<label className="ml-2" htmlFor="Hebreu">
																Hebreu
															</label>
														</div>
														<div className="w-25 my-2 d-flex align-items-center">
															<Field
																type="checkbox"
																name="languages"
																value="Portugais"
															/>
															<label className="ml-2" htmlFor="Portugais">
																Portugais
															</label>
														</div>
													</div>
													<div className="w-50">
														<div className="w-25 my-2 d-flex align-items-center">
															<Field
																type="checkbox"
																name="languages"
																value="Anglais"
															/>
															<label className="ml-2" htmlFor="Anglais">
																Anglais
															</label>
														</div>
														<div className="w-25 my-2 d-flex align-items-center">
															<Field
																type="checkbox"
																name="languages"
																value="Chinois"
															/>
															<label className="ml-2" htmlFor="Chinois">
																Chinois
															</label>
														</div>
														<div className="w-25 my-2 d-flex align-items-center">
															<Field
																type="checkbox"
																name="languages"
																value="Espagnol"
															/>
															<label className="ml-2" htmlFor="Espagnol">
																Espagnol
															</label>
														</div>
														<div className="w-25 my-2 d-flex align-items-center">
															<Field
																type="checkbox"
																name="languages"
																value="Italien"
															/>
															<label className="ml-2" htmlFor="Italien">
																Italien
															</label>
														</div>
														<div className="w-25 my-2 d-flex align-items-center">
															<Field
																type="checkbox"
																name="languages"
																value="Russe"
															/>
															<label className="ml-2" htmlFor="Russe">
																Russe
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="password-block2">
											<h2>Email notifications</h2>
											<div className="small pb-1 pt-3">
												Enter email you’d like to receive system notifications
											</div>
											<div className="small pb-3 pt-1">
												You can indicate several emails here.
											</div>
											<TagInput
												tags={values.notificationEmails}
												setTags={(tags) => {
													setFieldValue("notificationEmails", tags);
												}}
											/>
										</div>
										<div className="button-container">
											<div className="button-container2">
												<button className="save-button" type="submit">
													Save Changes
												</button>
											</div>
											<div className="button-container2">
												<button className="view-my-agency" onClick={() => {}}>
													Visualise my agency
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, ["steps", "header", "common"])),
		},
	};
};

export default Formpage;
