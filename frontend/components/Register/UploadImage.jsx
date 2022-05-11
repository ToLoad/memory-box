import { Carousel } from 'antd';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiOutlineMinusCircle, HiOutlinePhotograph } from 'react-icons/hi';
import { BASE_URL } from '../../utils/contants';
import AWSs3Upload, { getExtension } from './AWSs3Upload';
import { v4 as uuidv4 } from 'uuid';

export default function UploadImage(props) {
  const [images, setImages] = useState([{ name: '' }]);
  const [imageUrls, setImageUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [uuid, setUuid] = useState([]);

  const resetImage = () => {
    // 이미지 초기화
    setImageUrls([]);
    setUuid([]);
    props.setParentsImages([]);
  };

  const saveFileImage = e => {
    const imageLists = e.target.files;
    // 이미지 용량 제한
    let totalSize = 0;
    const arrayImageList = [...imageLists];
    arrayImageList.forEach(image => {
      totalSize += image.size;
    });
    if (totalSize > 52428800) {
      alert('동영상 파일은 50mb 까지 업로드 할 수 있습니다.');
      return;
    }
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
      const awsS3ImageUrl = arrayImageList.map(list => {
        const extension = getExtension(list);
        const imageUUID = uuidv4();
        setUuid(uuid => [...uuid, `${imageUUID}.${extension}`]);
        return `${BASE_URL}${props.id}/image/${imageUUID}.${extension}`;
      });
      console.log(awsS3ImageUrl, 'awsS3ImageUrl');
      props.setParentsImages(awsS3ImageUrl);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      setProgress(0);
      setSelectedFile(imageLists);
    }
  };
  return (
    <>
      {imageUrls.length === 0 ? (
        <div className="image">
          <div>
            <HiOutlinePhotograph />
            사진으로 된 기억 추가하기
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
                onClick={resetImage}
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
        <AWSs3Upload
          type="image"
          file={selectedFile}
          putButton={props.putButton}
          id={props.id}
          uuid={uuid}
        />
      )}
    </>
  );
}
