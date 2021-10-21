import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadFileStatus } from "antd/lib/upload/interface";
import { config } from "../../../config/siteConfigs";

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

const PictureWall = ({ images = [], setImages }) => {
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState([
		...images.map((url, index) => {
			return {
				uid: `${index}`,
				name: "image",
				status: "done" as UploadFileStatus,
				url,
			};
		}),
	]);

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const handleCancel = () => setPreviewVisible(false);

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setPreviewVisible(true);
		setPreviewImage(file.url || file.preview);
	};

	const handleChange = ({ fileList: _fileList }) => {
		setFileList([..._fileList]);
		setImages([..._fileList]);
		// console.log(_fileList);
	};

	return (
		<>
			<Upload
				action={`${config.apiDomain}/image-upload`}
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				{fileList.length >= 10 ? null : uploadButton}
			</Upload>
			<Modal
				visible={previewVisible}
				title="Property Image"
				footer={null}
				onCancel={handleCancel}
			>
				<img alt="example" style={{ width: "100%" }} src={previewImage} />
			</Modal>
		</>
	);
};

export default PictureWall;
