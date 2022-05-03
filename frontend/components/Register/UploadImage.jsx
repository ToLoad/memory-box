import { Carousel } from 'antd';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiOutlineMinusCircle, HiOutlinePhotograph } from 'react-icons/hi';
import AWS from 'aws-sdk';
import AWSs3Upload from './AWSs3Upload';

export default function UploadImage(props) {
  const [images, setImages] = useState([{ name: '' }]);
  const [imageUrls, setImageUrls] = useState([]);

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const saveFileImage = e => {
    const imageLists = e.target.files;
    let imageUrlLists = [...imageUrls];
    if (e.target.files[0] !== undefined) {
      for (let i = 0; i < e.target.files.length; i += 1) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
      if (imageUrlLists.length > 10) {
        // 이미지 10개로 제한
        imageUrlLists = imageUrlLists.slice(0, 10);
      }
      setImageUrls(imageUrlLists);
      setImages(imageLists);
      props.setParentsImages(imageLists);

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      setProgress(0);
      setSelectedFile(imageLists);
    }
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

  const uploadFile = file => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: BUCKET,
      Key: `image/${file.name}`,
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
    <>
      {imageUrls.length === 0 ? (
        <div className="image">
          <div>
            <HiOutlinePhotograph />
            이미지 추가하기
          </div>
          <div className="icons">
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              multiple
              onChange={saveFileImage}
              style={{ display: 'none' }}
            />
            <label htmlFor="imageUpload">
              <AiOutlinePlusCircle />
            </label>
          </div>
        </div>
      ) : (
        <>
          <div className="image">
            <div>
              <HiOutlinePhotograph />
              이미지 미리보기
            </div>
            <div className="icons">
              <HiOutlineMinusCircle
                style={{ color: 'red' }}
                onClick={() => setImageUrls([])}
              />
            </div>
          </div>
          <div id="preview">
            <Carousel autoplay style={{ width: '300px' }}>
              {imageUrls.map(imageUrl => {
                return (
                  <div key={imageUrl}>
                    <img src={imageUrl} alt="" />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </>
      )}
      {selectedFile.length > 0 && (
        <AWSs3Upload type="image" file={selectedFile} />
      )}
    </>
  );
}
