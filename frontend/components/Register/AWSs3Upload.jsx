import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

export const getExtension = files => {
  // 확장자 뽑아내기
  const extension = files.name.split('.');
  return extension[extension.length - 1];
};

export default function AWSs3Upload(props) {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [myBucket, setMyBucket] = useState('');
  const [count, setCount] = useState(0); // aws upload 한번만 실행되게 처리

  const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
  const REGION = process.env.NEXT_PUBLIC_UPLOAD_REGION;
  const BUCKET = process.env.NEXT_PUBLIC_UPLOAD_BUCKET;

  useEffect(() => {
    // AWS 한번만 실행되게
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });
    const initialBucket = new AWS.S3({
      params: { Bucket: BUCKET },
      region: REGION,
    });
    setMyBucket(initialBucket);
  }, []);

  useEffect(() => {
    // 파일 재 선택 시 업데이트
    setSelectedFile(props.file);
  }, [props.file]);

  const uploadFile = files => {
    setCount(1);
    // 만약 이미지 이고 선택된 사진이 2개 이상이라면
    if (props.type === 'image' && files.length > 1) {
      const arrayFiles = [...files]; // 객체 -> 배열로 변환
      let uuidCnt = 0;
      arrayFiles.forEach(file => {
        const params = {
          ACL: 'public-read',
          Body: file,
          Bucket: BUCKET,
          Key: `${props.id}/${props.type}/${props.uuid[uuidCnt]}`,
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
        // uuid 1 추가
        uuidCnt += 1;
      });
    } else if (props.type === 'image') {
      // 이미지가 하나일 때
      const params = {
        ACL: 'public-read',
        Body: files[0],
        Bucket: BUCKET,
        Key: `${props.id}/${props.type}/${props.uuid[0]}`,
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
    } else if (props.id === 'profile') {
      // 프로필 수정일 때
      const params = {
        ACL: 'public-read',
        Body: files[0],
        Bucket: BUCKET,
        Key: `${props.id}/${props.type}/${props.uuid[0]}`,
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
      console.log(files);
      const params = {
        ACL: 'public-read',
        Body: files,
        Bucket: BUCKET,
        // 만약 타입이 audio 일 때
        ...(props.type === 'audio' && {
          Key: `${props.id}/${props.type}/${props.uuid}`,
          ContentType: 'audio/wav',
        }),
        // 만약 타입이 video 일 때
        ...(props.type === 'video' && {
          Key: `${props.id}/${props.type}/${props.uuid}`,
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
      {selectedFile && props.putButton && count === 0
        ? uploadFile(selectedFile)
        : null}
    </div>
  );
}
