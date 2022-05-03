import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiOutlineFilm } from 'react-icons/hi';
import { BASE_URL } from '../../utils/contants';
import AWSs3Upload from './AWSs3Upload';

export default function UploadVideo(props) {
  const [thumbnail, setThumbnail] = useState('');
  const [videos, setVideos] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const makeThumbnail = event => {
    let file = event.target.files[0];
    if (file.size > 262144000) {
      // 동영상 용량 제한
      alert('동영상 파일은 250mb 까지 업로드 할 수 있습니다.');
      return;
    }
    let fileReader = new FileReader();

    const fileExt = file.name.split('.').pop();
    setProgress(0);
    setSelectedFile(event.target.files[0]);

    fileReader.onload = () => {
      let blob = new Blob([fileReader.result], { type: file.type });
      let url = URL.createObjectURL(blob);
      let video = document.createElement('video');

      let snapImage = () => {
        let canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext('2d')
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        let image = canvas.toDataURL();
        let success = image.length > 100000;
        if (success) {
          setThumbnail(image);
          URL.revokeObjectURL(url);
        }
        return success;
      };
      let timeupdate = () => {
        if (snapImage()) {
          video.removeEventListener('timeupdate', timeupdate);
          video.pause();
        }
      };
      video.addEventListener('loadeddata', () => {
        if (snapImage()) {
          video.removeEventListener('timeupdate', timeupdate);
        }
      });
      video.addEventListener('timeupdate', timeupdate);
      video.preload = 'metadata';
      video.src = url;
      // Load video in Safari / IE11
      video.muted = true;
      video.playsInline = true;
      video.play();
    };
    fileReader.readAsArrayBuffer(file);

    setVideos(file);
    props.setParentsVideos([`${BASE_URL}3MljqxpO/video/${file.name}`]);
    // props.setParentsVideos(`${BASE_URL}/${boxSequence}/video/${file.name}`);
  };

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
            onChange={makeThumbnail}
          />
          <label htmlFor="videoUpload">
            <AiOutlinePlusCircle />
          </label>
        </div>
      </div>
      {selectedFile && <AWSs3Upload type="video" file={selectedFile} />}
      {thumbnail !== '' && (
        <div className="video-preview">
          <div className="video-preview-image">
            <div className="video-preview-name">Video_Thumbnail</div>
            <img src={thumbnail} alt="" />
          </div>
        </div>
      )}
    </>
  );
}
