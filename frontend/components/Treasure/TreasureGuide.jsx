import React from 'react';
import styled from 'styled-components';

const GuideWrapper = styled.div`
  width: 100%;
  height: 70vh;
  padding: 5%;
  /* background-color: #c6c5c5; */
  h1 h2 h3 h4 {
    margin: 0;
  }
  overflow-y: scroll;
  overflow-x: hidden;

  img {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }

  .explain {
    width: 100%;
    height: 300px;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  /* 스크롤바 막대 설정*/
  ::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: #eb932e;
    /* 스크롤바 둥글게 설정    */
    border-radius: 10px;
  }

  /* 스크롤바 뒷 배경 설정*/
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const GuideContent = styled.div`
  width: 100%;
  height: 100%;
`;

export default function TreasureGuide() {
  return (
    <GuideWrapper>
      <GuideContent>
        <h1>보물 찾기란?</h1>
        <br />
        <h2>AR(augmented reality)의 약자로 증강 현실을 이용한 컨텐츠입니다.</h2>
        <h2>주변에 있는 공공기관에서 여러분들의 기억함을 획득하러 가세요!!</h2>
        <br />
        <h1>1 Step</h1>
        <h3>
          보물찾기는 모바일환경을 지원합니다!!
          <br /> pc로 접속중이라면 지금당장 휴대폰을 켜세요!!
        </h3>

        <h1>2 Step</h1>
        <h3>
          아래 사진에 보이는 이미지는 <br /> 현재 보물과 거리가 10m 이내라는
          표시 입니다
        </h3>
        <img src="/assets/images/하미.png" alt="사진없음" />

        <h1>3 Step</h1>
        <h3>
          10미터 이내라면 마크를 클릭!! 해보세요!!
          <br />
          아래 보이시는 사진과 같이,
          <br /> 여러분의 현실세계에 저희가 숨겨놓은 기억함들이 나타날거에요!!
        </h3>
        <img
          className="explain"
          src="/assets/images/로그인.png"
          alt="사진없음"
        />
      </GuideContent>
    </GuideWrapper>
  );
}
