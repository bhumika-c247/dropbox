import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axios from "axios";
const baseURL = `http://localhost:3002/api/`;

const Fileload = () => {
	let userDetails = JSON.parse(localStorage.getItem("user"));
	const [fileList, setFileList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const remove = async (value) => {
		console.log("remove called", value);
		try {
			const response = await axios.post(`${baseURL}auth/deleteFile`, {
				fileId: value._id,
				userId: userDetails._id,
			});
			if (response.status === 200) {
				getFiles();
			}
		} catch (error) {
			// alert("Something went wrong");
		}
	};

	const onSubmit = async (value) => {
		try {
			let formData = new FormData();
			formData.append("files", value.file);
			formData.append("userId", userDetails._id);
			const response = await axios.post(
				`${baseURL}user/singleFileUpload`,
				formData
			);
			if (response.status === 200) {
				getFiles();
			}
		} catch (error) {
			// alert("Something went wrong");
		}
	};

	const getFiles = async () => {
		setIsLoading(true);
		try {
			const response = await axios.post(`${baseURL}auth/getAllFile`, {
				userId: userDetails._id,
			});
			const { data } = response;
			console.log("resssss", response);
			if (data && data.userfiles) {
				setIsLoading(false);
				setFileList(data.userfiles);
			}
		} catch (error) {
			// alert("Something went wrong");
		}
	};

	useEffect(() => {
		getFiles();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<section className='upload-section d-flex'>
				{isLoading ? "loading..." : ""}
				<Upload
					directory
					multiple
					fileList={fileList}
					// openFileDialogOnClick
					onRemove={remove}
					// onChange={(response) => handleChange(response)}
					customRequest={onSubmit}
				>
					<div className='d-flex justify-content-center'>
						<Button icon={<UploadOutlined />}>Upload Files/Folder</Button>
					</div>
				</Upload>

				<Upload
					multiple
					showUploadList={false}
					// openFileDialogOnClick
					onRemove={remove}
					// onChange={(response) => handleChange(response)}
					customRequest={onSubmit}
				>
					<div className='d-flex justify-content-center'>
						<Button icon={<UploadOutlined />}>Upload Files/Folder</Button>
					</div>
				</Upload>
			</section>
		</>
	);
};

export default Fileload;
