import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axios from "axios";

const Fileload = () => {
	const [files, setFiles] = useState([]);
	const load = (value) => {
		setFiles(value.fileList);
	};

	const remove = (value) => {
		console.log("remove called");
	};
	const onSubmit = async (value) => {
		console.log("val", value.fileList);
		try {
			let formData = new FormData();
			formData.append("files", value.file);
			const response = await axios.post(
				"http://localhost:3002/api/user/singleFileUpload",
				// {file:JSON.stringify(value.file),userId:"63e1d610514403a2e5ec4fb7"}
				formData
			);
			console.log("res------------------------", response);
			// if (response?.data) {
			// 	setUser(response.data);
			// 	localStorage.setItem("token", response.data.token);
			// 	navigate("/upload");
			// } else {
			// 	alert();
			// }
		} catch (error) {
			// alert("Something went wrong");
		}
		console.log("files", files);
	};
	return (
		<>
			<section className='upload-section'>
				<Upload
					// directory
					multiple
					// openFileDialogOnClick
					onRemove={remove}
					onChange={(response) => load(response)}
					customRequest={onSubmit}
				>
					<h3>Drag/drop or click to upload files</h3>
					<div className='d-flex justify-content-center'>
						<Button icon={<UploadOutlined />}>Upload Files/Folder</Button>
					</div>
				</Upload>
			</section>
		</>
	);
};

export default Fileload;
