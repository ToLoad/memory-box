import React, { useEffect, useState } from 'react';
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
import { useMutation } from 'react-query';
import { saveMemoryBox } from '../../api/eunseong';
import { Router } from 'next/router';

export default function RegisterRight(props) {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [imagesUrl, setImagesUrl] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [recordUrl, setRecordUrl] = useState();
  const [putButton, setPutButton] = useState(false);

  const handleNickname = e => {
    setNickname(e.target.value);
  };
  const handleContent = e => {
    setContent(e.target.value);
  };
  const clip = () => {
    // 주소 복사하기
    // 나중에 카톡으로 공유하기 버튼 만들기
    let url = '';
    let textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('URL이 복사되었습니다. 친구에게 보내보세요');
  };

  // 기억함 담기
  const mutation = useMutation(saveMemoryBox);

  const onClickPutButton = () => {
    if (nickname === '') {
      alert('닉네임을 입력해주세요');
    } else if (content === '') {
      alert('미래에 하고싶은 말을 작성해주세요');
    } else {
      // aws s3에 저장하기
      setPutButton(true);
      // DB에 보내주기
      mutation.mutate(
        {
          apiBoxId: props.id,
          apiContent: content,
          apiImageUrl: imagesUrl,
          apiNickname: nickname,
          apiVideoUrl: videoUrl,
          apiVoiceUrl: recordUrl,
        },
        {
          onSuccess: () => {
            Router.push('/mybox');
          },
        },
      );
    }
  };
  return (
    <RegisterRightWrapper>
      <InnerRightBlock>
        <HeaderWrapper>
          <div className="title">기억 입력</div>
          <Button style={{ fontSize: '15px' }} onClick={clip}>
            친구 초대하기
          </Button>
        </HeaderWrapper>
        <ContentsWrapper>
          <div className="nickname">
            <div>
              <HiOutlineUser />
              닉네임
            </div>
            <input
              placeholder="기억함 전용 닉네임을 입력해주세요"
              onChange={handleNickname}
            />
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <div className="content">
            <div>
              <HiOutlineClipboard />
              남기고 싶은 말
            </div>
            <textarea
              placeholder="미래에 하고싶은 말을 남겨보세요"
              onChange={handleContent}
            />
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadImage setParentsImages={setImagesUrl} putButton={putButton} />
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadVideo setParentsVideos={setVideoUrl} putButton={putButton} />
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadAudio setParentsRecord={setRecordUrl} putButton={putButton} />
        </ContentsWrapper>
        <ButtonWrapper>
          <Button onClick={onClickPutButton}>담기</Button>
        </ButtonWrapper>
      </InnerRightBlock>
    </RegisterRightWrapper>
  );
}
