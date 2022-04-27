import React from 'react';
import KakaoLogin from './KakaoLogin';
import { LoginContent, LoginWrapper } from './OpenBox.style';

export default function OpenBox() {
  return (
    <LoginWrapper>
      <div className="title">
        <p>Login</p>
      </div>
      <div className="box">
        <LoginContent>
          <p>기억:함 은 카카오톡 로그인을 지원합니다.</p>
          <p>카카오톡 연동을 통해 편하게 로그인하세요.</p>
          <KakaoLogin />
        </LoginContent>
      </div>
    </LoginWrapper>
  );
}
