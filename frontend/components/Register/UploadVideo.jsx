import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiOutlineFilm } from 'react-icons/hi';

export default function UploadVideo() {
  return (
    <>
      <div className="video">
        <div>
          <HiOutlineFilm />
          비디오 추가하기
        </div>
        <div className="icons">
          <input
            type="file"
            accept="video/mp4,video/mkv, video/x-m4v,video/*"
            id="videoUpload"
            style={{ display: 'none' }}
          />
          <label htmlFor="videoUpload">
            <AiOutlinePlusCircle />
          </label>
        </div>
      </div>
    </>
  );
}
