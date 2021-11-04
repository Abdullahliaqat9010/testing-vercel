import React, { useEffect, useState } from "react";
import { Upload, message, notification } from "antd";
import {
	FacebookFilled,
	InstagramFilled,
	LinkedinFilled,
	TwitterCircleFilled,
	YoutubeFilled,
} from "@ant-design/icons";
import { QuestionCircleFilled } from "@ant-design/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeaderContainer from "../../containers/Header";
import { useTranslation } from "react-i18next";
import NavBarContainer from "../../containers/NavBar";
import UploadImage from "../../assets/images/upload-img.svg";
import UploadPicture from "../../assets/images/upload-picture.svg";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import {
	getAgencyProfile,
	handleImageUpload,
	updateAgencyProfile,
} from "../../network-requests";
import Loading from "../../components/Loading";

const socialIconsProps = { style: { fontSize: 38, color: "#8F99B4" } };

const socialLinks = [
	{
		id: "facebook",
		icon: <FacebookFilled {...socialIconsProps} />,
	},
	{
		id: "twitter",
		icon: <TwitterCircleFilled {...socialIconsProps} />,
	},
	{
		id: "instagram",
		icon: <InstagramFilled {...socialIconsProps} />,
	},
	{
		id: "linkedin",
		icon: <LinkedinFilled {...socialIconsProps} />,
	},
	{
		id: "youtube",
		icon: <YoutubeFilled {...socialIconsProps} />,
	},
];

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
				onKeyUp={(event: any) => {
					event.key === " " ? addTagData(event) : null;
				}}
			/>
		</div>
	);
};

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

const Formpage = () => {
	const { t } = useTranslation("agency-settings");
	const languages = [
		t("language.Nederlands"),
		t("language.Italien"),
		t("language.Frans"),
		t("language.Arabe"),
		t("language.Duits"),
		t("language.Pools"),
		t("language.Engels"),
		t("language.Turk"),
		t("language.Spaans"),
		t("language.Russisch"),
	];

	const [logoImage, setLogoImage] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const [agencyProfile, setAgencyProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { locale } = useRouter();

	const onSubmit = (values) => {
		return new Promise(async (res, rej) => {
			try {
				const coverImagePromise =
					values.cover_image instanceof File
						? handleImageUpload(values.cover_image)
						: Promise.resolve(values?.cover_image);
				const logoImagePromise =
					values.logo_image instanceof File
						? handleImageUpload(values.logo_image)
						: Promise.resolve(values?.logo_image);
				const imageUploadPromise = [coverImagePromise, logoImagePromise];
				message.info("Uploading images...");
				const [cover_image, logo_image] = await Promise.all(imageUploadPromise);
				await updateAgencyProfile({
					...values,
					notification_emails: values.notification_emails.join(),
					social_links: JSON.stringify(values.social_links),
					languages: JSON.stringify(values.languages),
					cover_image,
					logo_image,
				});
				notification.success({
					description: "Changes are made successfully",
					message: "Success",
					placement: "bottomRight",
				});
				res("");
			} catch (error) {
				rej(error);
			}
		});
	};

	const _getAgencyProfile = async () => {
		try {
			setIsLoading(true);
			const _agencyProfile = await getAgencyProfile(locale);
			setAgencyProfile({ ..._agencyProfile });
			setCoverImage(_agencyProfile?.cover_image);
			setLogoImage(_agencyProfile?.logo_image);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		_getAgencyProfile();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<HeaderContainer title={t("title")} />
			<div className="AgencySettingsPage container d-flex">
				<NavBarContainer />

				<Formik
					initialValues={{
						social_links: agencyProfile?.social_links
							? JSON.parse(agencyProfile?.social_links)
							: {
									facebook: "",
									twitter: "",
									instagram: "",
									youtube: "",
									linkedin: "",
							  },
						languages: agencyProfile?.languages
							? JSON.parse(agencyProfile?.languages)
							: {
									arabe: false,
									allemand: false,
									coreen: false,
									hebreu: false,
									portugais: false,
									anglais: false,
									chinois: false,
									espagnol: false,
									italien: false,
									russe: false,
							  },
						notification_emails: agencyProfile?.notification_emails
							? agencyProfile?.notification_emails.split(",")
							: [],
						logo_image: agencyProfile?.logo_image
							? agencyProfile?.logo_image
							: "",
						cover_image: agencyProfile?.cover_image
							? agencyProfile?.cover_image
							: "",
						description: agencyProfile?.description
							? agencyProfile?.description
							: "",
						website: agencyProfile?.website ? agencyProfile?.website : "",
					}}
					// validationSchema={SignupSchema}
					onSubmit={onSubmit}
				>
					{({ values, setFieldValue, submitForm, isSubmitting }) => (
						<Form>
							<div className="AgencySettingsPage__container w-100">
								<div className="first-block">
									<h1>{t("h1.votre")}</h1>
									<div>{t("votre.description")}</div>

									<div className="password-block2">
										<div className="d-flex flex-row justify-content-between pb-4">
											<div className="pr-3">
												<h2>{t("h2.photo")}</h2>
												<div>{t("photo.description")}</div>
											</div>
											<div
												style={{ width: 160 }}
												className="d-flex flex-row-reverse"
											>
												<Upload
													className="logo_uploader"
													id="logo"
													beforeUpload={() => false}
													listType="picture-card"
													showUploadList={false}
													onChange={async ({ file }) => {
														const _base64 = (await getBase64(file)) as string;
														setLogoImage(_base64);
														setFieldValue("logo_image", file);
													}}
												>
													{values.logo_image ? (
														<img
															style={{
																objectFit: "cover",
																width: "100%",
																height: "100%",
															}}
															src={logoImage}
														/>
													) : (
														<div>
															<img src={UploadImage} />
															<Button className="upload-btn">
																<img
																	className="mr-1 pb-1"
																	src={UploadPicture}
																/>
																{t("upload.photo")}
															</Button>
														</div>
													)}
												</Upload>
											</div>
										</div>
										<div className="alert-block">
											<QuestionCircleFilled
												style={{ paddingTop: 5, paddingRight: 10 }}
												color={"#d3d3d3"}
											/>
											<div>{t("question.description")}</div>
										</div>
										<div className="w-100">
											<Upload
												className="cover_uploader"
												listType="picture-card"
												id="cover"
												beforeUpload={() => false}
												showUploadList={false}
												onChange={async ({ file }) => {
													const _base64 = (await getBase64(file)) as string;
													setCoverImage(_base64);
													setFieldValue("cover_image", file);
												}}
											>
												{values.cover_image ? (
													<img
														style={{
															objectFit: "cover",
															width: "100%",
															height: "100%",
														}}
														src={coverImage}
													/>
												) : (
													<div className="d-flex flex-column">
														<img src={UploadImage} />
														<Button className="upload-btn">
															<img className="mr-1 pb-1" src={UploadPicture} />
															{t("upload.photo")}
														</Button>
													</div>
												)}
											</Upload>
											<div className="d-flex flex-column form-input-block mt-4">
												<label
													className="form-label fs-2"
													htmlFor="description"
												>
													{t("label.description")}
												</label>
												<Field
													className="form-input"
													name="description"
													type="text"
													as="textarea"
													style={{ height: "auto" }}
													rows={5}
												/>
												<ErrorMessage
													className="form-error"
													component="div"
													name="description"
												/>
											</div>
											<div className="d-flex flex-column form-input-block mt-4">
												<label className="form-label fs-2" htmlFor="website">
													{t("label.website")}
												</label>
												<Field
													className="form-input"
													name="website"
													type="text"
												/>
												<ErrorMessage
													className="form-error"
													component="div"
													name="website"
												/>
											</div>
										</div>
										<div className="password-block2 pb-0">
											<h2>{t("h2.social")}</h2>
											{socialLinks.map(({ icon, id }) => (
												<div key={id} className="social-container">
													{icon}
													<div className="ml-4 w-100">
														<Field
															className="form-input w-100 h-auto"
															type="text"
															name={`social_links.${id}`}
															placeholder={`https://${id}.com/yourcompany`}
														/>
													</div>
												</div>
											))}
										</div>
										<div className="password-block2">
											<h2>{t("h2.language")}</h2>
											<div className="pb-3 small">
												{t("div.select-language")}
											</div>
											<div
												role="group"
												aria-labelledby="checkbox-group"
												style={{ width: "100%" }}
											>
												<div className="d-flex flex-row align-items-center flex-wrap">
													{languages.map((language) => (
														<div
															key={language}
															className="w-50 my-2 d-flex flex-row justify-content-start align-items-center"
														>
															<Field
																type="checkbox"
																name={`languages.${language.toLowerCase()}`}
															/>
															<label className="ml-3 mb-0" htmlFor={language}>
																{language}
															</label>
														</div>
													))}
												</div>
											</div>
										</div>
										<div className="password-block2">
											<h2>{t("h2.email-notification")}</h2>
											<div style={{ fontSize: 14 }} className="pb-1 pt-3">
												{t("dev.write-emails")}
											</div>
											<TagInput
												tags={values.notification_emails}
												setTags={(tags) => {
													setFieldValue("notification_emails", tags);
												}}
											/>
										</div>
										<div className="button-container">
											<div className="button-container2">
												<button
													className="save-button"
													type="button"
													onClick={() => submitForm()}
												>
													{isSubmitting
														? t("button.loading")
														: t("button.save")}
												</button>
											</div>
											{/* <div className="button-container2">
												<button className="view-my-agency" onClick={() => {}}>
													{t("button.view")}
												</button>
											</div> */}
										</div>
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"agency-settings",
				"header",
				"common",
			])),
		},
	};
};

export default Formpage;
