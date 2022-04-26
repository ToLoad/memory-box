import React from 'react';
import { useRouter } from 'next/router';
import { LoginContent, LoginBox, LoginWrapper } from './OpenBox.style';

export default function OpenBox() {
  const router = useRouter();

  const callKakaoLoginHandler = () => {
    router.push({
      pathname: 'https://kauth.kakao.com/oauth/authorize',
      query: {
        response_type: 'code',
        client_id: '567a8b28d04673db5db47220a0b711fc',
        redirect_uri: 'http://localhost:3000/kakao/callback',
      },
    });
  };
  return (
    <LoginWrapper>
      <div className="title">
        <p>Login</p>
      </div>
      <div className="box">
        <LoginContent>
          <p>기억:함 은 카카오톡 로그인을 지원합니다.</p>
          <p>카카오톡 연동을 통해 편하게 로그인하세요.</p>
          <LoginBox
            onClick={() => {
              callKakaoLoginHandler();
            }}
          >
            <img src="/kakao.png" alt="사진없노" />
            <div>카카오톡 로그인</div>
          </LoginBox>
        </LoginContent>
      </div>
    </LoginWrapper>
  );
}
