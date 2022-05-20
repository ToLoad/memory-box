var AWS = require('aws-sdk');
var fs = require('fs');

const s3 = new AWS.S3({
  // accessKeyId: process.env.AWS_ACCESS_KEY,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: 'AKIAYEYWWXJNJPOEKLU3',
  secretAccessKey: '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',
  region: 'ap-northeast-2',
});

var param = {
  Bucket: 'guards-memorybox',
  Key: '3/image/' + 'ucc.mp4',
  ACL: 'public-read',
  Body: fs.createReadStream('./public/ucc.mp4'),
};

s3.upload(param, function (err, data) {
  if (err) {
    console.log(err);
  }
  console.log(data);
});

s3.deleteObject(
  {
    Bucket: 'guards-memorybox', // 사용자 버켓 이름
    Key: 'box-sequence/image/', // 버켓 내 경로
  },
  (err, data) => {
    if (err) {
      throw err;
    }
    console.log('s3 deleteObject ', data);
  },
);
