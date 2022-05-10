import React, { useEffect } from 'react';
import { Button } from '../styles/variables';
const apikey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

export default function KakaoShare(props) {
  const createKakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(`${apikey}`);
      }
      kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '기억:함',
          description: '여러분들의 소중한 기억을 담아보세요!',
          imageUrl:
            'https://cdn.mhns.co.kr/news/photo/201610/25649_52581_449.JPG',
          link: {
            mobileWebUrl: `https://k6e201.p.ssafy.io/register/${props.id}`,
            webUrl: `https://k6e201.p.ssafy.io/register/${props.id}`,
            androidExecParams: 'test',
          },
        },
        buttons: [
          {
            title: '기억 보관하러 가기',
            link: {
              mobileWebUrl: `https://k6e201.p.ssafy.io/register/${props.id}`,
              webUrl: `https://k6e201.p.ssafy.io/register/${props.id}`,
            },
          },
        ],
      });
    }
  };

  return (
    <Button style={{ fontSize: '15px' }} onClick={createKakaoButton}>
      카카오톡 공유하기
    </Button>
  );
}
