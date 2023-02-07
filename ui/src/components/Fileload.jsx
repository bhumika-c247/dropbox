import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axios from "axios";

const Fileload = () => {
	let userDetails = JSON.parse(localStorage.getItem("user"));
	const [files, setFiles] = useState([]);
	const [fileList, setFileList] = useState([]);
	const load = (value) => {
		setFiles(value.fileList);
	};

	const remove = async (value) => {
		console.log("remove called", value);
		try {
			const response = await axios.post(
				"http://localhost:3002/api/auth/deleteFile",
				{ fileId: value._id, userId: userDetails._id }
			);
			if (response.status === 200) {
				getFiles();
			}
			console.log("res------------------------", response);
		} catch (error) {
			// alert("Something went wrong");
		}
	};

	const onSubmit = async (value) => {
		console.log("val", value.fileList);
		try {
			let formData = new FormData();
			formData.append("files", value.file);
			formData.append("userId", userDetails._id);
			const response = await axios.post(
				"http://localhost:3002/api/user/singleFileUpload",
				formData
			);
			console.log("res------------------------", response);
		} catch (error) {
			// alert("Something went wrong");
		}
		console.log("files", files);
	};

	const getFiles = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3002/api/auth/getAllFile",
				{ userId: userDetails._id }
			);
			const { data } = response;
			if (data && data.data && data.data[0]) {
				setFileList(data?.data[0]?.userfiles);
			}
		} catch (error) {
			// alert("Something went wrong");
		}
	};

	useEffect(() => {
		getFiles();
	}, []);

	// const [fileList, setFileList] = useState([
	// 	{
	// 		uid: "-1",
	// 		name: "xxx.png",
	// 		status: "done",
	// 		url: "http://www.baidu.com/xxx.png",
	// 	},
	// ]);

	const handleChange = (info) => {
		let newFileList = [...info.fileList];

		// 1. Limit the number of uploaded files
		// Only to show two recent uploaded files, and old ones will be replaced by the new
		newFileList = newFileList.slice(-2);

		// 2. Read from response and show file link
		newFileList = newFileList.map((file) => {
			if (file.response) {
				// Component will show file.url as link
				file.url = file.response.url;
			}
			return file;
		});

		setFileList(newFileList);
	};
	return (
		<>
			<section className='upload-section d-flex'>
		
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
					showUploadList = {false}
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
