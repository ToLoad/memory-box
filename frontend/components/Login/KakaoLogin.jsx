import React from 'react';
import { useRouter } from 'next/router';
import { LoginBox } from './OpenBox.style';

export default function KakaoLogin() {
  const router = useRouter();
  console.log();
  // https://memory-box.kr/main
  // https://k6e201.p.ssafy.io/
  // http://localhost:3000/login
  const callKakaoLoginHandler = () => {
    if (window.location.href.slice(8, 9) === 'm') {
      router.push({
        pathname: 'https://kauth.kakao.com/oauth/authorize',
        query: {
          response_type: 'code',
          client_id: '567a8b28d04673db5db47220a0b711fc',
          redirect_uri: 'https://memory-box.kr/kakao/callback',
        },
      });
    }
    router.push({
      pathname: 'https://kauth.kakao.com/oauth/authorize',
      query: {
        response_type: 'code',
        client_id: '567a8b28d04673db5db47220a0b711fc',
        redirect_uri: 'https://k6e201.p.ssafy.io/kakao/callback',
      },
    });
  };

  return (
    <LoginBox>
      <img
        src="/kakaologinimg.png"
        alt="사진없노"
        onClick={() => {
          callKakaoLoginHandler();
        }}
      />
    </LoginBox>
  );
}
