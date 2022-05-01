import React, { useState } from 'react';
import { ButtonWrapper } from '../Main/Main.style';
import {
  ContentsWrapper,
  HeaderWrapper,
  InnerRightBlock,
  RegisterRightWrapper,
} from './Register.style';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  HiOutlineUser,
  HiOutlineFilm,
  HiOutlinePhotograph,
  HiOutlineClipboard,
  HiOutlineMinusCircle,
} from 'react-icons/hi';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import { Button } from '../../styles/variables';
import AudioRecord from './AudioRecord';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';

export default function RegisterRight() {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [record, setRecord] = useState('');
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
          <UploadImage setParentsImages={setImages} />
        </ContentsWrapper>
        {/* <ImageTest /> */}
        <ContentsWrapper>
          <UploadVideo setParentsVideos={setVideo} />
        </ContentsWrapper>
        <ContentsWrapper>
          <AudioRecord setParentsRecord={setRecord} />
        </ContentsWrapper>
        <ButtonWrapper>
          <Button>담기</Button>
        </ButtonWrapper>
      </InnerRightBlock>
    </RegisterRightWrapper>
  );
}
