import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor as _Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { config } from "../../config/siteConfigs";

import HeaderContainer from "../../containers/Header";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Button, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import TextareaAutosize from "react-textarea-autosize";

const Editor = dynamic(
	() => {
		return import("react-draft-wysiwyg").then((mod) => mod.Editor);
	},
	{ ssr: false }
) as typeof _Editor;

const EditBlog = ({ blog, params }) => {
	const { t } = useTranslation("login-page");
	const [title, setTitle] = useState<string>(blog?.title);
	const [isSavingBlog, setIsSavingBlog] = useState(false);
	const [isDeletingBlog, setIsDeletingBlog] = useState(false);
	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createWithContent(
			convertFromRaw(blog?.content ? JSON.parse(blog?.content) : "{}")
		)
	);
	const [cover, setCover] = useState(blog?.cover_image);
	const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false);
	const [isUpdateSuccessVisible, setIsUpdateSuccessVisible] =
		useState<boolean>(false);

	const router = useRouter();

	const handleUpdateBlog = async () => {
		try {
			setIsSavingBlog(true);
			setIsUpdateSuccessVisible(false);
			await axios.patch(`/blogs/${params?.id}`, {
				title,
				content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
				text: editorState.getCurrentContent().getPlainText("\u0001"),
				cover_image: cover,
			});
			setIsUpdateSuccessVisible(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsSavingBlog(false);
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

	const handleImageUpload = (image) => {
		return new Promise(async (res, rej) => {
			try {
				const formData = new FormData();
				formData.append("upload", image);
				const { data } = await axios.post(`/image-upload`, formData, {
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

	const handleBlogImageUpload = (image) => {
		return new Promise(async (res, rej) => {
			try {
				const link = await handleImageUpload(image);
				res({
					data: {
						link,
					},
				});
			} catch (error) {
				rej(error);
			}
		});
	};

	const handleCoverImageUpload = async (image) => {
		try {
			setIsUploadingCover(true);
			const link = await handleImageUpload(image);
			setCover(link);
			setIsUploadingCover(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div style={{ minHeight: "100vh", backgroundColor: "white" }}>
			<HeaderContainer title={t("title")} />
			<div
				style={{
					backgroundColor: "#1d2e5b",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					paddingBottom: 25,
					paddingTop: 10,
				}}
			>
				<TextareaAutosize
					className="title-input blog-title"
					maxLength={100}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Add Title Here"
				/>
			</div>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					position: "relative",
					backgroundColor: "transparent",
					marginTop: -5,
				}}
			>
				<div
					style={{
						height: "50%",
						width: "100%",
						position: "absolute",
						backgroundColor: "#1d2e5b",
					}}
				/>

				{cover ? (
					<div
						style={{ zIndex: 2, position: "relative" }}
						className="blog-cover-container"
					>
						<img className="blog-cover" src={cover} alt="cover" />
						<Button
							variant="danger"
							onClick={() => setCover(null)}
							style={{
								position: "absolute",
								bottom: 0,
								right: 0,
								margin: 5,
							}}
						>
							Delete Cover
						</Button>
					</div>
				) : (
					<div className="upload-cover-placeholder">
						<input
							onChange={(e) => {
								const files = e.target.files;
								if (files.length > 0) {
									handleCoverImageUpload(files[0]);
								}
							}}
							type="file"
							name="blogFile"
							multiple={false}
							id="blogFile"
							accept="image/x-png,image/gif,image/jpeg"
							className="inputfile"
						/>
						<label htmlFor="blogFile">
							{isUploadingCover ? "Uploading..." : "Choose a cover"}
						</label>
					</div>
				)}
			</div>
			<div
				style={{
					paddingTop: 20,
					paddingBottom: 20,
					width: "100%",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Editor
					placeholder="Start writing here"
					editorState={editorState}
					onEditorStateChange={(e) => {
						setEditorState(e);
					}}
					wrapperClassName="blog-editor-container editor-wrapper"
					editorStyle={{ padding: 20 }}
					toolbar={{
						image: {
							uploadEnabled: true,
							uploadCallback: handleBlogImageUpload,
							defaultSize: {
								width: "100%",
								height: "auto",
							},
						},
					}}
				/>
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
						{isSavingBlog ? "Deleting..." : "Delete Blog"}
					</Button>
					<Button
						disabled={title.length === 0 || isSavingBlog || !cover}
						style={{ padding: "10px 30px", borderRadius: "8px" }}
						onClick={handleUpdateBlog}
					>
						{isSavingBlog ? "Saving..." : "Save Changes"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
	locale,
}) => {
	try {
		const { data } = await axios.get(`/blogs/${params.id}`);
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
				...(await serverSideTranslations(locale, ["login-page", "header"])),
			}, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default EditBlog;
