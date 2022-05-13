import React, { useEffect, useState } from 'react';
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
import DefaultMainPage from './DefaultMainPage';
import { getMainCloseBox } from '../../api/box';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import { SessionStorage } from '../../api';

export default function MainPage() {
  // 로그인 처리
  const [isLogin, setIsLogin] = useState(false);

  const token = SessionStorage.getItem('ACCESS_TOKEN');

  // api
  const { isLoading, data, refetch } = useQuery(
    'getCloseBox',
    () => getMainCloseBox(),
    {
      enabled: !!token,
    },
  );

  useEffect(() => {
    let Token = sessionStorage.getItem('ACCESS_TOKEN');
    // 로그인 확인
    if (Token) {
      setIsLogin(true);
    }
    // 들어올때마다 refetch() 하기
    refetch();
  }, []);

  const [nowData, setNowData] = useState(0);
  const handleNowData = e => {
    const number = nowData + e;
    if (number === -1) {
      setNowData(data.length - 1);
    } else if (number > data.length - 1) {
      setNowData(0);
    } else {
      setNowData(number);
    }
  };
  return (
    <>
      {isLogin && data !== 0 ? (
        <MainWrapper>
          {!isLoading ? (
            <>
              <MainLeftWrapper>
                <div className="d-day">
                  오픈까지
                  <div className="time">
                    D - {data[Number(nowData)].dDay}일&nbsp;
                    {data[Number(nowData)].dDayHour}시간&nbsp;
                    {data[Number(nowData)].dDayMinute}분
                  </div>
                </div>
                <div className="title">{data[Number(nowData)].title}</div>
                <div className="content">
                  <p>{data[Number(nowData)].content}</p>
                </div>
              </MainLeftWrapper>
              <MainRightWrapper>
                <VideoWrapper>
                  <img src={data[Number(nowData)].imageSrc} alt="" />
                </VideoWrapper>
                <ProgressBar percent={data[Number(nowData)].percent} />
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
                    <div className="time">
                      D - {data[Number(nowData)].dDay}일&nbsp;
                      {data[Number(nowData)].dDayHour}시간&nbsp;
                      {data[Number(nowData)].dDayMinute}분
                    </div>
                  </div>
                  <div className="title">{data[Number(nowData)].title}</div>
                  <div className="content">{data[Number(nowData)].content}</div>
                </MobileWrapper>
              </MainRightWrapper>
            </>
          ) : (
            <Loading />
          )}
        </MainWrapper>
      ) : (
        // 로그인 안했을 때
        <DefaultMainPage />
      )}
    </>
  );
}
