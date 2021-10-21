import React, { ReactNode, useState } from "react";
import { useTranslation } from "next-i18next";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "react-bootstrap";
import axios from "axios";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface BlogEditorProps {
	editorState: EditorState;
	setEditorState: (editorState: EditorState) => void;
	title: string;
	setTitle: (title: string) => void;
	cover: string;
	setCover: (cover: string) => void;
	buttonFooter: ReactNode;
	seoSettingsBlock?: ReactNode | null;
}

export const BlogEditor = ({
	editorState,
	setEditorState,
	title,
	setTitle,
	cover,
	setCover,
	buttonFooter,
	seoSettingsBlock = null,
}: BlogEditorProps) => {
	const { t } = useTranslation("blog");
	const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false);

	const handleImageUpload = (image: File): Promise<string> => {
		return new Promise(async (res, rej) => {
			try {
				const formData = new FormData();
				formData.append("file", image);
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
		<React.Fragment>
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
					placeholder={t("title.placeholder")}
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
							{t("btn.delete-cover")}
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
							className="inputfile "
						/>
						<label htmlFor="blogFile">
							{isUploadingCover ? "Uploading..." : t("btn.cover")}
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
					placeholder={t("blog.placeholder")}
					editorState={editorState}
					onEditorStateChange={setEditorState}
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
							previewImage: true,
							alt: { present: true, mandatory: true },
						},
					}}
				/>
				{seoSettingsBlock}
				{buttonFooter}
			</div>
		</React.Fragment>
	);
};
