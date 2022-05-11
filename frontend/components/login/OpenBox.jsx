import React from 'react';
import KakaoLogin from './KakaoLogin';
import { LoginContent, LoginWrapper } from './OpenBox.style';
import { JoinUserWrapper, JoinUserContent } from './JoinUser.style';

export default function OpenBox() {
  return (
    <JoinUserWrapper>
      <JoinUserContent>
        {/* <div className="title"> */}
        <img className="img" src="/assets/images/하미.png" alt="" />
        <h2>Login</h2>
        {/* </div> */}
        <h1>기억:함 은 카카오톡 로그인을 지원합니다.</h1>
        <h1>카카오톡 연동을 통해 편하게 로그인하세요.</h1>
        {/* <div style={{ marginBottom: '50px', height: '50px' }} /> */}
        <KakaoLogin />
      </JoinUserContent>
    </JoinUserWrapper>
  );
}
