import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const Fileload = () => {
  const load = () => {
    console.log('load is callled ');
  };

  return (
    <>
    <section className='upload-section'>
      <Upload action={load} directory>
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
