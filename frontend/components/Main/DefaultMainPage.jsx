import React, { useEffect, useState } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import {
  ButtonWrapper,
  MainLeftWrapper,
  MainRightWrapper,
  MainWrapper,
  MobileWrapper,
  VideoWrapper,
} from './Main.style';
import ProgressBar from './ProgressBar';

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
          {/* <div>
            <img src="/냥냥이.gif" alt="" />
          </div> */}
          <video
            src="/assets/video/res_spring_1.mp4"
            autoPlay
            muted
            loop
            width="100%"
            height="100%"
            playsInline
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
