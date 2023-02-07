import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axios from "axios";
import AppConfig from "../AppConfig";

const Fileload = () => {
	let userDetails = JSON.parse(localStorage.getItem("user"));
	const [fileList, setFileList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const remove = async (value) => {
		console.log("remove called", value);
		try {
			const response = await axios.post(
				`${AppConfig.API_ENDPOINT}user/deleteFile`,
				{
					fileId: value.uid,
					userId: userDetails._id,
				}
			);
			// remove from states here

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
				`${AppConfig.API_ENDPOINT}user/singleFileUpload`,
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
		// let temp = [];

		try {
			const response = await axios.post(
				`${AppConfig.API_ENDPOINT}user/getAllFile`,
				{
					userId: userDetails._id,
				}
			);
			const { data } = response;
			const temp = [];
			console.log("resssss", response);
			if (data && data.userfiles) {
				setIsLoading(false);
				data.userfiles.map((item) => {
					console.log("tem", item);
					return temp.push({
						uid: item._id,
						name: item.name,
						status: "done",
						url: `${AppConfig.FILES_ENDPOINT}${item.path}`,
					});
				});
				setFileList(temp);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			// alert("Something went wrong");
			setIsLoading(false);
		}
	};

  useEffect(() => {
    getFiles();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h5>Upload files/folder:</h5>
      <section className='upload-section'>
        <p>{isLoading ? 'loading...' : ''}</p>
        <Upload
          directory
          multiple
          fileList={fileList}
          // openFileDialogOnClick
          onRemove={remove}
          // onChange={(response) => handleChange(response)}
          customRequest={onSubmit}
        >
          <div className='upload_wrapper'>
            <Button icon={<UploadOutlined />}>Upload Folder</Button>
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
          <div className='upload_wrapper'>
            <Button icon={<UploadOutlined />}>Upload Files</Button>
          </div>
        </Upload>
      </section>
    </>
  );
};

export default Fileload;
