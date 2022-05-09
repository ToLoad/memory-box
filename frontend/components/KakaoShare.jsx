import React, { useEffect } from 'react';
const apikey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

export default function kakaoShare() {
  console.log(apikey);
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
            mobileWebUrl: 'https://k6e201.p.ssafy.io/',
            androidExecParams: 'test',
          },
        },
        buttons: [
          {
            title: '기억 보관하러 가기',
            link: {
              mobileWebUrl: 'https://k6e201.p.ssafy.io/',
            },
          },
        ],
      });
    }
  };

  // useEffect(() => {
  //   // eslint-disable-next-line no-use-before-define
  //   createKakaoButton();
  // }, []);
  return (
    <div
      onClick={() => {
        createKakaoButton();
      }}
    >
      <img style={{ width: '100px', height: '100px' }} src="/혼구리2.png" />
    </div>
  );
}
