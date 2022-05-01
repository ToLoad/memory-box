/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from 'react';
import ProgressBar from '../Main/ProgressBar';
import {
  ProgressBarWrapper,
  ContentWrapper,
  LeftContent,
  RightContent,
} from './Mybox.style';
import DdayButton from './DdayButton';
import {
  DetailBoxWrapper,
  BoxDetailContent,
  DetailContentWrapper,
  DayWrapper,
  DetailInfoWrapper,
  MapInfoWrapper,
  GroupInfoWrapper,
} from './detailBox.style';
import Map from '../Map/Map';

export default function DetailBox(props) {
  const [mapInfo, setMapInfo] = useState(true);
  const [compoH, setCompoH] = useState('');
  const height = useRef();
  const today = new Date();
  const Dday = new Date(props.boxInfo.boxOpenAt);

  const distance = Dday.getTime() - today.getTime();
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  // console.log(props.boxInfo, '박스정보');
  const StartDay = new Date(props.boxInfo.boxCreatedAt);
  // console.log(StartDay.getTime(), Dday.getTime(), '시간단위');
  const totalDayLenght = Dday.getTime() - StartDay.getTime();
  // console.log(totalDayLenght, '총 시간');
  // console.log((totalDayLenght - distance) / totalDayLenght, '총 시간');

  console.log(today.getTime(), Dday.getTime(), '비교용');
  console.log(height.clientHeight, '높이');
  function getPercent() {
    const StartDay = new Date(props.boxInfo.boxCreatedAt);
    const Dday = new Date(props.boxInfo.boxOpenAt);
    const today = new Date();
    const distance = Dday.getTime() - today.getTime();
    if (today.getTime() > Dday.getTime()) {
      return 100;
    }
    const leftDay = ((totalDayLenght - distance) / totalDayLenght) * 100;
    // console.log(leftDay, '남은일');
    const leftDayPer = Math.floor(leftDay);
    return leftDayPer;
  }

  function MapLocation() {
    if (props.boxInfo.boxLocLat === 0 && props.boxInfo.boxLocLng === 0) {
      setMapInfo(false);
    }
  }
  console.log(compoH, '컴포넌트높이');
  useEffect(() => {
    MapLocation();
  }, []);

  useEffect(() => {
    const h = String(height.current.getBoundingClientRect().height);
    const he = h + 'px';
    setCompoH(he);
  });

  return (
    <DetailBoxWrapper
      id="container"
      ref={height}
      click={props.click}
      firstClick={props.firstClick}
      num={props.num}
      height={compoH}
    >
      <div className={props.click ? 'on' : 'off'}>
        {/* <button onClick={() => setMapInfo(!mapInfo)}>하잉</button> */}
        <ContentWrapper>
          <LeftContent />
          <RightContent>
            <div className="contentGroup">
              <p>{props.boxInfo.boxName}</p>
            </div>
            <div className="dayGroup">
              <div
                className="toggleButton"
                onClick={() => {
                  props.set(props.num);
                }}
              >
                ++
              </div>
              <div className="state">
                <DdayButton day={day} num={props.num} />
              </div>
            </div>
          </RightContent>
        </ContentWrapper>
        <DayWrapper>
          <div className="date">{props.boxInfo.boxCreatedAt.slice(0, 10)}</div>
          <div className="date">{props.boxInfo.boxOpenAt.slice(0, 10)}</div>
        </DayWrapper>

        <ProgressBar percent={getPercent()} />

        <DetailContentWrapper>
          <BoxDetailContent>
            <p>{props.boxInfo.boxDescription}</p>
          </BoxDetailContent>
        </DetailContentWrapper>
        <DetailInfoWrapper>
          {mapInfo ? (
            <MapInfoWrapper>
              묻은 위치
              <Map
                className="map"
                lat={props.boxLocLat}
                lng={props.boxLocLng}
              />
            </MapInfoWrapper>
          ) : null}

          <GroupInfoWrapper mapInfo={mapInfo}>
            함께 한 사람
            <div className="group">
              {props.boxInfo.user.map((value, i) => {
                return (
                  <>
                    {value.userProfileImage ? (
                      <img
                        className="groupUserImage"
                        src={value.userProfileImage}
                      />
                    ) : (
                      <img src="혼구리2.png" alt="사진없노" />
                    )}
                  </>
                );
              })}
            </div>
          </GroupInfoWrapper>
        </DetailInfoWrapper>
      </div>
    </DetailBoxWrapper>
  );
}
