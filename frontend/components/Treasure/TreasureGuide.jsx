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
  padding: 5%;
  width: 100%;
  height: 100%;
  .explain {
    width: 95%;
    height: auto;
    margin-bottom: 60px;
  }
  .marker {
    width: 50px;
    height: 70px;
    margin-bottom: 20px;
  }
`;

export default function TreasureGuide() {
  return (
    <GuideWrapper>
      <GuideContent>
        <h1>보물 찾기란?</h1>
        <br />
        <h2>AR(augmented reality)의 약자로 증강 현실을 이용한 컨텐츠입니다.</h2>
        <h2>주변에 있는 공공시설에서 여러분들의 기억함을 획득하러 가세요!!</h2>
        <br />
        <h1>1 Step</h1>
        <h3>
          보물찾기는 모바일환경을 지원합니다!!
          <br /> pc로 접속중이라면 지금당장 휴대폰을 켜세요!!
        </h3>

        <h1>2 Step</h1>
        <h3>
          마커와의 거리가 50m 이내라면,
          <br /> 아래 보이는 마커를 눌렸을 때 AR 페이지로 이동합니다.
        </h3>
        <br />
        <img
          className="marker"
          src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
          alt="사진없음"
        />
        <br />
        <h1>3 Step</h1>
        <h3>
          마크를 클릭해서 AR 페이지로 이동하셨나요?!
          <br />
          아래 보이시는 사진과 같이,
          <br /> 여러분의 현실세계에 저희가 숨겨놓은 기억함들이 나타날거에요!!
        </h3>
        <img
          className="explain"
          src="/assets/images/arpage.png"
          alt="사진없음"
        />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </GuideContent>
    </GuideWrapper>
  );
}
