import React from 'react';
import { useRouter } from 'next/router';
import { LoginBox } from './OpenBox.style';

export default function KakaoLogin() {
  const router = useRouter();

  const callKakaoLoginHandler = () => {
    router.push({
      pathname: 'https://kauth.kakao.com/oauth/authorize',
      query: {
        response_type: 'code',
        client_id: '567a8b28d04673db5db47220a0b711fc',
        redirect_uri: 'https://k6e201.p.ssafy.io/kakao/callback',
        // redirect_uri: 'http://localhost:3000/kakao/callback',
      },
    });
  };

  return (
    <LoginBox
      onClick={() => {
        callKakaoLoginHandler();
      }}
    >
      <img
        src="/kakaologinImg.png"
        alt="사진없노"
        onClick={() => {
          callKakaoLoginHandler();
        }}
      />
    </LoginBox>
  );
}
