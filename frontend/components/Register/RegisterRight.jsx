import React, { useState } from 'react';
import { ButtonWrapper } from '../Main/Main.style';
import {
  ContentsWrapper,
  HeaderWrapper,
  InnerRightBlock,
  RegisterRightWrapper,
} from './Register.style';
import { HiOutlineUser, HiOutlineClipboard } from 'react-icons/hi';
import 'antd/dist/antd.css';
import { Button } from '../../styles/variables';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';
import UploadAudio from './UploadAudio';

export default function RegisterRight() {
  const [nickname, setNickname] = useState('유저');
  const [content, setContent] = useState('');
  const [imagesUrl, setImagesUrl] = useState([]);
  const [videoUrl, setVideoUrl] = useState([]);
  const [recordUrl, setRecordUrl] = useState('');
  const handleNickname = e => {
    setNickname(e.target.value);
  };
  const handleContent = e => {
    setContent(e.target.value);
  };
  return (
    <RegisterRightWrapper>
      <InnerRightBlock>
        <HeaderWrapper>
          <div className="title">캡슐 정보 입력</div>
          <Button style={{ fontSize: '15px' }}>친구 초대하기</Button>
        </HeaderWrapper>
        <ContentsWrapper>
          <div className="nickname">
            <div>
              <HiOutlineUser />
              닉네임
            </div>
            <input
              placeholder="닉네임을 입력해주세요"
              onChange={handleNickname}
            />
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <div className="content">
            <div>
              <HiOutlineClipboard />
              내용
            </div>
            <textarea
              placeholder="미래에 하고싶은 말을 남겨보세요"
              onChange={handleContent}
            />
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadImage setParentsImages={setImagesUrl} />
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadVideo setParentsVideos={setVideoUrl} />
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadAudio setParentsRecord={setRecordUrl} />
        </ContentsWrapper>
        <ButtonWrapper>
          <Button>담기</Button>
        </ButtonWrapper>
      </InnerRightBlock>
    </RegisterRightWrapper>
  );
}
