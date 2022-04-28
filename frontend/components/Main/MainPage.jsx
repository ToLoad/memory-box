import React, { useState } from 'react';
import {
  ButtonWrapper,
  MainLeftWrapper,
  MainRightWrapper,
  MainWrapper,
  MobileWrapper,
  VideoWrapper,
} from './Main.style';
import 'antd/dist/antd.css';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import ProgressBar from './ProgressBar';

export default function MainPage() {
  const datas = [
    {
      dDay: '1550일 14:12',
      title: '부울경 2반의 추억여행',
      content:
        '부울경 2반의 추억여행 타임캡슐 입니다. 이 타임캡슐은 10년 뒤 open 될 예정입니다. 다들 즐거운 추억 보관하시길 바랍니다.',
      percent: '50',
      imageSrc: '/image.gif',
    },
    {
      dDay: '15일 14:12',
      title: '부울경 1반의 추억여행',
      content:
        '부울경 2반의 추억여행 타임캡슐 입니다. 이 타임캡슐은 10년 뒤 open 될 예정입니다. 다들 즐거운 추억 보관하시길 바랍니다.',
      percent: '20',
      imageSrc: '/악어.gif',
    },
    {
      dDay: '155022일 14:12',
      title: '부울경 3반의 추억여행',
      content:
        '부울경 모여라 10년 뒤 open 될 예정입니다. 다들 즐거운 추억 보관하시길 바랍니다.',
      percent: '90',
      imageSrc: '/냥냥이.gif',
    },
  ];
  const [nowData, setNowData] = useState(0);
  const handleNowData = e => {
    const number = nowData + e;
    if (number === -1) {
      setNowData(datas.length - 1);
    } else if (number > datas.length - 1) {
      setNowData(0);
    } else {
      setNowData(number);
    }
  };
  return (
    <MainWrapper>
      <MainLeftWrapper>
        <div className="d-day">
          도착까지
          <div className="time">{datas[Number(nowData)].dDay}</div>
        </div>
        <div className="title">{datas[Number(nowData)].title}</div>
        <div className="content">
          <p>{datas[Number(nowData)].content}</p>
        </div>
      </MainLeftWrapper>
      <MainRightWrapper>
        <VideoWrapper>
          {/* <div>비디오</div> */}
          <div>
            <img src={datas[Number(nowData)].imageSrc} alt="" />
          </div>
          {/* <video
          src="/assets/video/혼자어때.mp4"
          autoPlay
          muted
          loop
          width="100%"
          height="100%"
        /> */}
        </VideoWrapper>
        <ProgressBar percent={datas[Number(nowData)].percent} />
        <ButtonWrapper>
          <AiOutlineDoubleLeft
            className="leftBtn"
            onClick={() => handleNowData(-1)}
          />
          <AiOutlineDoubleRight
            className="rightBtn"
            onClick={() => handleNowData(1)}
          />
        </ButtonWrapper>
        {/* 모바일 시 보임 */}
        <MobileWrapper>
          <div className="d-day">
            도착까지
            <div className="time">{datas[Number(nowData)].dDay}</div>
          </div>
          <div className="title">{datas[Number(nowData)].title}</div>
          <div className="content">{datas[Number(nowData)].content}</div>
        </MobileWrapper>
      </MainRightWrapper>
    </MainWrapper>
  );
}
