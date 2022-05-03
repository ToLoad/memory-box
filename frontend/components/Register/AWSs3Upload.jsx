import React, { useState } from 'react';
import AWS from 'aws-sdk';

export default function AWSs3Upload(props) {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(props.file);
  const [showAlert, setShowAlert] = useState(false);

  const getExtension = files => {
    // 확장자 뽑아내기
    const extension = files.name.split('.');
    return extension[extension.length - 1];
  };

  const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
  const REGION = process.env.NEXT_PUBLIC_UPLOAD_REGION;
  const BUCKET = process.env.NEXT_PUBLIC_UPLOAD_BUCKET;

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: BUCKET },
    region: REGION,
  });

  const uploadFile = files => {
    // 만약 이미지 이고 선택된 사진이 2개 이상이라면
    if (props.type === 'image' && files.length > 1) {
      const arrayFiles = [...files]; // 객체 -> 배열로 변환
      arrayFiles.forEach(file => {
        const params = {
          ACL: 'public-read',
          Body: file,
          Bucket: BUCKET,
          // Key: `${props.type}/${file.name}`,
          Key: `3MljqxpO/${props.type}/${file.name}`,
          ContentType: `image/${getExtension(file)}`,
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
      });
    } else if (props.type === 'image') {
      // 이미지가 하나일 때
      const params = {
        ACL: 'public-read',
        Body: files[0],
        Bucket: BUCKET,
        // Key: `${props.type}/${files[0].name}`,
        Key: `3MljqxpO/${props.type}/${files[0].name}`,
        ContentType: `image/${getExtension(files[0])}`,
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
    } else {
      getExtension(files);
      const params = {
        ACL: 'public-read',
        Body: files,
        Bucket: BUCKET,
        // Key: `${props.type}/${files.name}`,
        Key: `3MljqxpO/${props.type}/${files.name}`,
        // 만약 타입이 audio이면 ContentType에 audio 지정
        ...(props.type === 'audio' && { ContentType: 'audio/mp3' }),
        ...(props.type === 'video' && {
          ContentType: `video/${getExtension(files)}`,
        }),
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
    }
  };

  return (
    <div>
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
