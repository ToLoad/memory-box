import { Carousel } from 'antd';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiOutlineMinusCircle, HiOutlinePhotograph } from 'react-icons/hi';

export default function UploadImage() {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

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
    }
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
    </>
  );
}
