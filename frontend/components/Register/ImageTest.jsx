import React, { useState } from 'react';
import AWS from 'aws-sdk';

export default function ImageTest() {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const ACCESS_KEY = 'AKIAYEYWWXJNAI5DN5YY';
  const SECRET_ACCESS_KEY = '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';
  const REGION = 'ap-northeast-2';
  const S3_BUCKET = 'guards-memorybox';

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const handleFileInput = e => {
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    if (file.type !== 'image/jpeg' || fileExt !== 'jpg') {
      alert('jpg 파일만 Upload 가능합니다.');
      return;
    }
    setProgress(0);
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = file => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: 'upload/' + file.name,
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', evt => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setSelectedFile(null);
        }, 3000);
      })
      .send(err => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <input color="primary" type="file" onChange={handleFileInput} />
      {selectedFile ? (
        <button
          color="primary"
          onClick={() => uploadFile(selectedFile)}
          type="button"
        >
          Upload to S3
        </button>
      ) : null}
    </div>
  );
}
