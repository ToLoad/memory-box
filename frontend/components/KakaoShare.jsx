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
            'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a8a97103-b6d0-430e-a453-bc1c0359664a/openBox.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220513%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220513T190926Z&X-Amz-Expires=86400&X-Amz-Signature=d9dfb9e56e635bf47b98c9cd5b3e7fc8f1e02a3bd18f03a5fa09e19c584cf783&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22openBox.png%22&x-id=GetObject',
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

  return <Button onClick={createKakaoButton}>카카오톡 초대</Button>;
}
