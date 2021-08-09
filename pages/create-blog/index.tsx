import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor as _Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { config } from "../../config/siteConfigs";

import HeaderContainer from "../../containers/Header";
import { convertToRaw, EditorState } from "draft-js";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

// const CoverImage = ({}) =>{
// 	return()
// }

const Editor = dynamic(
	() => {
		return import("react-draft-wysiwyg").then((mod) => mod.Editor);
	},
	{ ssr: false }
) as typeof _Editor;

const CreateBlog = () => {
	const { t } = useTranslation("login-page");
	const [title, setTitle] = useState<string>("");
	const [isSavingBlog, setIsSavingBlog] = useState(false);
	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createEmpty()
	);
	const [cover, setCover] = useState(null);
	const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false);

	const router = useRouter();

	const handleCreateBlog = async () => {
		try {
			setIsSavingBlog(true);
			await axios.post(`${config.apiDomain}/blogs`, {
				title,
				content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
				text: editorState.getCurrentContent().getPlainText("\u0001"),
				cover_image: cover,
			});
			router.replace("/blogs");
		} catch (error) {
			console.log(error);
		} finally {
			setIsSavingBlog(false);
		}
	};

	const handleImageUpload = (image) => {
		return new Promise(async (res, rej) => {
			try {
				const formData = new FormData();
				formData.append("upload", image);
				const { data } = await axios.post(
					`${config.apiDomain}/image-upload`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
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
			<div className="title-container">
				<textarea
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Add Title Here"
					maxLength={100}
				/>
			</div>
			<div
				style={{
					minHeight: "calc(100vh - 267px)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						backgroundColor: cover ? "white" : "#ddedff",
						height: cover ? "auto" : 240,
					}}
					className="cover-image-container"
				>
					{cover ? (
						<div style={{ width: "100%", height: "100%" }}>
							<img
								src={cover}
								style={{ width: "100%", height: 300, objectFit: "cover" }}
								alt="cover"
							/>
							<Button
								variant="danger"
								onClick={() => setCover(null)}
								style={{ float: "right", marginTop: 10 }}
							>
								Delete Cover
							</Button>
						</div>
					) : (
						<div>
							<input
								onChange={(e) => {
									const files = e.target.files;
									if (files.length > 0) {
										handleCoverImageUpload(files[0]);
									}
								}}
								type="file"
								name="file"
								multiple={false}
								id="file"
								accept="image/x-png,image/gif,image/jpeg"
								className="inputfile"
							/>
							<label htmlFor="file">
								{isUploadingCover ? "Uploading..." : "Choose a cover"}
							</label>
						</div>
					)}
				</div>
				<Editor
					placeholder="Start writing here"
					editorState={editorState}
					onEditorStateChange={(e) => {
						setEditorState(e);
					}}
					wrapperClassName="editor-wrapper"
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

				<Button
					disabled={title.length === 0 || isSavingBlog || !cover}
					style={{ float: "right", margin: "20px 0px", padding: "10px 30px" }}
					onClick={handleCreateBlog}
				>
					{isSavingBlog ? "Saving..." : "Save Blog"}
				</Button>
			</div>
		</div>
	);
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ["login-page", "header"])),
	},
});

export default CreateBlog;
