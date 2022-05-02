import React from 'react';
// import fs from 'fs';
import AWS from 'aws-sdk';

export default function Test() {
  //   var AWS = require('aws-sdk');
  //   var fs = require('fs');

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // accessKeyId: 'AKIAYEYWWXJNJPOEKLU3',
    // secretAccessKey: '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',
    region: 'ap-northeast-2',
  });
  console.log(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY, '아아아');

  var param = {
    Bucket: 'guards-memorybox',
    Key: '3/image/' + 'ucc.mp4',
    ACL: 'public-read',
    Body: './public/ucc.mp4',
  };

  const uploadImage = () => {
    s3.upload(param, function (err, data) {
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
  };

  const deleteImage = () => {
    s3.deleteObject(
      {
        Bucket: 'guards-memorybox', // 사용자 버켓 이름
        Key: '3/image/ucc.mp4', // 버켓 내 경로
      },
      (err, data) => {
        if (err) {
          throw err;
        }
        console.log('s3 deleteObject ', data);
      },
    );
  };

  return (
    <div>
      <button type="button" onClick={uploadImage}>
        업로드
      </button>
      <button type="button" onClick={deleteImage}>
        삭제
      </button>
    </div>
  );
}
