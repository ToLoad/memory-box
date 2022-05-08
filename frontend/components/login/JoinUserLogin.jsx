import React from 'react';
import { JoinUserWrapper, JoinUserContent } from './JoinUser.style';
import KakaoLogin from './KakaoLogin';

export default function JoinUserLogin(props) {
  return (
    <JoinUserWrapper>
      <JoinUserContent>
        <h1>로그인</h1>
        <h2>부울경 2반의 추억여행</h2>
        <div className="content">
          <h3>
            부울경 2반의 추억여행 타임캡슐입니다. 이 타임캡슐은 10년 뒤 open 될
            예정입니다.
          </h3>
        </div>
      </JoinUserContent>
      <KakaoLogin />
      {/* <div style={{ marginBottom: '30px' }} /> */}
    </JoinUserWrapper>
  );
}
