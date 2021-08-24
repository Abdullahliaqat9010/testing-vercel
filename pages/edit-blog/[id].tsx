import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import axios from "axios";

import HeaderContainer from "../../containers/Header";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Button, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import { BlogEditor as _Editor } from "../../components/Editor";
import { Typography, Form, Input } from "antd";
import { useEffect } from "react";
import { generateSlug } from "../../utils/generateSlug";
import { parseJwt } from "../../utils";
import jwt from "jsonwebtoken";
import { config } from "../../config/siteConfigs";

const Editor = dynamic(
	() => {
		return import("../../components/Editor").then((mod) => mod.BlogEditor);
	},
	{ ssr: false }
) as typeof _Editor;

const { Text } = Typography;

const EditBlog = ({ blog, params }) => {
	console.log(blog);

	const { t } = useTranslation("blog");
	const [title, setTitle] = useState<string>(blog?.title);
	const [isSavingBlog, setIsSavingBlog] = useState(false);
	const [isDeletingBlog, setIsDeletingBlog] = useState(false);
	const [blogSlug, setBlogSlug] = useState<string>("");
	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createWithContent(
			convertFromRaw(blog?.content ? JSON.parse(blog?.content) : "{}")
		)
	);
	const [cover, setCover] = useState(blog?.cover_image);
	const [isUpdateSuccessVisible, setIsUpdateSuccessVisible] =
		useState<boolean>(false);
	const [isSlugUpdateSuccessVisible, setIsSlugUpdateSuccessVisible] =
		useState<boolean>(false);
	const [isSavingSlug, setIsSavingSlug] = useState<boolean>(false);

	const router = useRouter();
	const [form] = Form.useForm();

	const handleUpdateBlog = async () => {
		try {
			setIsSavingBlog(true);
			setIsUpdateSuccessVisible(false);
			await axios.patch(
				`/blogs/${params?.id}`,
				{
					title,
					content: JSON.stringify(
						convertToRaw(editorState.getCurrentContent())
					),
					text: editorState.getCurrentContent().getPlainText("\u0001"),
					cover_image: cover,
				},
				{
					headers: {
						Authorization: localStorage.getItem("access_token"),
					},
				}
			);
			setIsUpdateSuccessVisible(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsSavingBlog(false);
		}
	};

	const handleUpdateSlug = async () => {
		try {
			setIsSavingSlug(true);
			setIsSlugUpdateSuccessVisible(false);
			await axios.patch(`/blogs/${params?.id}/slug`, {
				slug: blogSlug,
			});
			setIsSlugUpdateSuccessVisible(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsSavingSlug(false);
		}
	};

	const handleDeleteBlog = async () => {
		try {
			setIsDeletingBlog(true);
			await axios.delete(`/blogs/${params?.id}`);
			router.replace("/blogs");
		} catch (error) {
			console.log(error);
		} finally {
			setIsDeletingBlog(false);
		}
	};

	return (
		<div style={{ minHeight: "100vh", backgroundColor: "white" }}>
			<HeaderContainer title={t("title")} />
			<Editor
				editorState={editorState}
				setEditorState={setEditorState}
				title={title}
				setTitle={setTitle}
				cover={cover}
				setCover={setCover}
				buttonFooter={
					<React.Fragment>
						<Alert
							show={isUpdateSuccessVisible}
							dismissible={true}
							variant="success"
							onClose={() => setIsUpdateSuccessVisible(false)}
							style={{ marginBottom: 0, marginTop: 20 }}
						>
							Changes have been made successfully
						</Alert>
						<div style={{ marginTop: 20, marginBottom: 20 }}>
							<Button
								disabled={isDeletingBlog}
								style={{
									padding: "10px 30px",
									marginRight: 40,
									borderRadius: "8px",
								}}
								onClick={handleDeleteBlog}
								variant="danger"
							>
								{isDeletingBlog ? "Deleting..." : t("btn.delete-blog")}
							</Button>
							<Button
								disabled={title.length === 0 || isSavingBlog || !cover}
								style={{ padding: "10px 30px", borderRadius: "8px" }}
								onClick={handleUpdateBlog}
							>
								{isSavingBlog ? t("text.saving") : t("btn.save-changes")}
							</Button>
						</div>
					</React.Fragment>
				}
				seoSettingsBlock={
					<div className="seo-settings-container">
						<Text style={{ fontWeight: "bold", fontSize: 20 }}>
							{t("text.ceo-settings")}
						</Text>
						<Form style={{ width: "100%", paddingTop: 20 }}>
							<Form.Item name="slug" label={t("text.blog-slug")}>
								<div style={{ display: "flex", flexDirection: "row" }}>
									<Input
										value={blogSlug}
										onChange={(e) => setBlogSlug(e.target.value)}
										maxLength={60}
										placeholder={blog?.slug}
										className="input-antd-custom"
										style={{
											width: "100%",
											borderRadius: 5,
											border: "1px solid rgb(200, 200, 200)",
										}}
									/>
									<Button
										onClick={handleUpdateSlug}
										disabled={blogSlug?.length < 5 || isSavingSlug}
										style={{ marginLeft: 10 }}
									>
										{isSavingSlug ? t("text.saving") : t("btn.save")}
									</Button>
								</div>
							</Form.Item>
						</Form>
						<Alert
							show={isSlugUpdateSuccessVisible}
							dismissible={true}
							variant="success"
							onClose={() => setIsSlugUpdateSuccessVisible(false)}
							style={{ marginBottom: 0, marginTop: 20 }}
						>
							Changes have been made successfully
						</Alert>
					</div>
				}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
	locale,
	req,
}) => {
	try {
		const axiosInstance = axios.create({
			baseURL: config.apiDomain,
		});
		if (req.cookies?.access_token) {
			const parsedAccessToken = jwt.decode(req.cookies?.access_token) as {
				account_type: string;
			};
			const isAdmin = parsedAccessToken.account_type === "admin";
			if (!isAdmin) {
				return {
					notFound: true,
				};
			}
		} else {
			return {
				notFound: true,
			};
		}
		const { data } = await axiosInstance.get(`/blogs/${params.id}`);
		if (!data) {
			return {
				notFound: true,
			};
		}
		return {
			props: {
				blog: {
					...data,
				},
				params,
				...(await serverSideTranslations(locale, [
					"login-page",
					"header",
					"blog",
				])),
			}, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default EditBlog;
