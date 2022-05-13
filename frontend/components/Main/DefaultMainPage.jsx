import React, { useEffect, useState } from 'react';
import {
  ButtonWrapper,
  MainLeftWrapper,
  MainRightWrapper,
  MainWrapper,
  MobileWrapper,
  VideoWrapper,
} from './Main.style';
import ProgressBar from './ProgressBar';
const videos = [
  '/assets/images/spring.gif',
  '/assets/images/summer.gif',
  '/assets/images/fall.gif',
  '/assets/images/winter.gif',
];
export default function DefaultMainPage() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (progress === 100) {
        setProgress(0);
      } else {
        setProgress(progress + 1);
      }
    }, 500);
  });
  return (
    <MainWrapper>
      <MainLeftWrapper>
        <div className="d-day">
          <div>
            <img src="/assets/images/하미.png" alt="" /> 반가워요! 난 기억함의
            요정
          </div>
        </div>
        <div className="title">
          하미예요!
          {/* <img src="/assets/images/openBox.png" alt="" /> */}
        </div>
        <div className="content">
          <p>
            여러분들의 소중한 기억들을 지정된 날짜와 시간으로 <br />
            안전하게 배송해줄게요 ⏰
          </p>
        </div>
      </MainLeftWrapper>
      <MainRightWrapper>
        <VideoWrapper>
          <img
            src={
              (progress >= 0 && progress < 25 && videos[0]) ||
              (progress >= 25 && progress < 50 && videos[1]) ||
              (progress >= 50 && progress < 75 && videos[2]) ||
              (progress >= 75 && progress <= 100 && videos[3])
            }
            alt=""
          />
        </VideoWrapper>
        <ProgressBar percent={progress} />
        {/* 모바일 시 보임 */}
        <MobileWrapper>
          <div className="d-day">
            <img src="/assets/images/하미.png" alt="" />
            반가워요! 난 기억함의 요정
          </div>
          <div className="title">하미에요!</div>
          <div className="content">
            <p>
              여러분들의 소중한 기억들을 지정된 날짜와 시간으로 <br />
              안전하게 배송해줄게요 ⏰
            </p>
          </div>
        </MobileWrapper>
      </MainRightWrapper>
    </MainWrapper>
  );
}
