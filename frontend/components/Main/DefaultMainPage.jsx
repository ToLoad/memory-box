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
          반갑습니다
          <div className="time">추억을 담고 공유할 수 있는</div>
        </div>
        <div className="title">기억:함 입니다.</div>
        <div className="content">
          <p>
            기억함 서비스는 친구나 단체에서 추억을 담고 지정된 시간이 지난 후
            일정 인원이 모이게 된다면 추억을 열어볼 수 있는 서비스 입니다.
          </p>
        </div>
      </MainLeftWrapper>
      <MainRightWrapper>
        <VideoWrapper>
          <img
            // src="assets/images/ezgif.com-gif-maker.gif"
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
            반갑습니다
            <div className="time"> 추억을 담고 공유할 수 있는</div>
          </div>
          <div className="title">기억:함 입니다.</div>
          <div className="content">
            기억함 서비스는 친구나 단체에서 추억을 담고 지정된 시간이 지난 후
            일정 인원이 모이게 된다면 추억을 열어볼 수 있는 서비스 입니다.
          </div>
        </MobileWrapper>
      </MainRightWrapper>
    </MainWrapper>
  );
}
