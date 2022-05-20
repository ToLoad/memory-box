import React, { useCallback, useEffect, useState } from 'react';
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
import { saveMemoryBox } from '../../api/register';
import Router from 'next/router';
import KakaoShare from '../KakaoShare';
import Swal from 'sweetalert2';

export default function RegisterRight(props) {
  const data = props.data;
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [imagesUrl, setImagesUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [recordUrl, setRecordUrl] = useState('');
  const [putButton, setPutButton] = useState(false);
  const [checkedAudio, setCheckedAudio] = useState(false);
  const [stopAudio, setStopAudio] = useState(false);

  const handleNickname = e => {
    setNickname(e.target.value);
  };
  const handleContent = e => {
    setContent(e.target.value);
  };

  useEffect(() => {
    // 카톡으로 공유하기 버튼 만들기
    const $script = document.createElement('script');
    $script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    $script.async = true;

    document.head.appendChild($script);

    return () => {
      document.head.removeChild($script);
    };
  }, []);

  const clip = () => {
    // 주소 복사하기
    let url = '';
    let textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    Swal.fire({
      icon: 'success',
      title: 'URL이 복사되었습니다.!',
      text: '✨친구에게 보내보세요✨',
    });
  };

  // 기억함 담기
  const mutation = useMutation(saveMemoryBox);
  const onClickPutButton = () => {
    if (nickname === '') {
      Swal.fire('닉네임을 입력해주세요');
    } else if (content === '') {
      Swal.fire('미래에 하고싶은 말을 작성해주세요');
    } else if (stopAudio && !checkedAudio) {
      // 만약 녹음을 했고, 결과를 확인하지 않았다면
      Swal.fire('음성녹음 결과를 확인해주세요');
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
          boxIsSolo: data.boxIsSolo,
        },
        {
          onSuccess: () => {
            Swal.fire({
              icon: 'success',
              title: '기억을 담았어요!',
              text: '✨박스로 이동할게요✨',
            });
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
          {!data.boxIsSolo && (
            <div className="link">
              <Button onClick={clip} className="clip">
                초대링크 복사
              </Button>
              <KakaoShare id={props.id} />
            </div>
          )}
        </HeaderWrapper>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: '15px',
          }}
        >
          <div style={{ color: '#ff491c' }}>*</div>&nbsp; 은 필수 입력
          항목입니다.
        </div>
        <ContentsWrapper>
          <div className="nickname">
            <div
              style={{
                position: 'absolute',
                top: 15,
                left: 88,
                color: '#ff491c',
                fontSize: '15px',
              }}
            >
              *
            </div>
            <div>
              <HiOutlineUser />
              닉네임
            </div>
            <input
              placeholder="기억함 전용 닉네임을 입력해주세요"
              onChange={handleNickname}
              maxLength="15"
            />
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <div className="content">
            <div
              style={{
                position: 'absolute',
                top: 17,
                left: 143,
                color: '#ff491c',
                fontSize: '15px',
              }}
            >
              *
            </div>
            <div>
              <div>
                <HiOutlineClipboard />
                남기고 싶은 말
              </div>
              <div className="length">{content.length}/200</div>
            </div>
            <textarea
              placeholder="미래에 하고싶은 말을 남겨보세요"
              onChange={handleContent}
              maxLength="200"
            />
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadImage
            setParentsImages={setImagesUrl}
            id={props.id}
            putButton={putButton}
          />
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadVideo
            setParentsVideos={setVideoUrl}
            id={props.id}
            putButton={putButton}
          />
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadAudio
            setParentsRecord={setRecordUrl}
            setCheckedAudio={setCheckedAudio}
            setStopAudio={setStopAudio}
            id={props.id}
            putButton={putButton}
          />
        </ContentsWrapper>
        <ButtonWrapper>
          <Button onClick={onClickPutButton}>담기</Button>
        </ButtonWrapper>
      </InnerRightBlock>
    </RegisterRightWrapper>
  );
}
