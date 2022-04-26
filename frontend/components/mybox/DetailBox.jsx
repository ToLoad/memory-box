/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from 'react';
import ProgressBar from './ProgressBar';
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
  const [boxHeight, setBoxHeight] = useState();
  const Height = useRef();

  useEffect(() => {
    setBoxHeight(Height.current.clientHeight);
  }, []);

  console.log(boxHeight);

  return (
    <DetailBoxWrapper ref={Height} Height={boxHeight} click={props.click}>
      <div className={props.click ? 'on' : 'off'}>
        {/* <button onClick={() => setMapInfo(!mapInfo)}>하잉</button> */}
        <ContentWrapper>
          <LeftContent />
          <RightContent>
            <div className="contentGroup">
              <p>Title</p>
            </div>
            <div className="dayGroup">
              <div
                className="toggleButton"
                onClick={() => {
                  props.set();
                }}
              >
                ++
              </div>
              <div className="state">
                <DdayButton />
              </div>
            </div>
          </RightContent>
        </ContentWrapper>
        <DayWrapper>
          <div className="date">start day</div>
          <div className="date">end day</div>
        </DayWrapper>
        <ProgressBarWrapper>
          <ProgressBar />
        </ProgressBarWrapper>
        <DetailContentWrapper>
          <BoxDetailContent>
            <p>
              오늘은 그냥 디자인이나 했따. 근데 반응형은 처음 해보는데 넘무
              재밋다 조금 걱정되는건 지금 내가 쓰고 있는 코드 방식이 깔끔한
              코드인지는 아직도 잘 모르겠다
            </p>
          </BoxDetailContent>
        </DetailContentWrapper>
        <DetailInfoWrapper>
          {mapInfo ? (
            <MapInfoWrapper>
              묻은 위치
              <Map className="map" />
            </MapInfoWrapper>
          ) : null}

          <GroupInfoWrapper mapInfo={mapInfo}>
            함께 한 사람
            <div className="group">
              <img
                className="groupUserImage"
                src="/assets/images/night.png"
                alt=""
              />
              <img
                className="groupUserImage"
                src="/assets/images/night.png"
                alt=""
              />
              <img
                className="groupUserImage"
                src="/assets/images/night.png"
                alt=""
              />
              <img
                className="groupUserImage"
                src="/assets/images/night.png"
                alt=""
              />
              <img
                className="groupUserImage"
                src="/assets/images/night.png"
                alt=""
              />
              <img
                className="groupUserImage"
                src="/assets/images/night.png"
                alt=""
              />
              <img
                className="groupUserImage"
                src="/assets/images/night.png"
                alt=""
              />
              <img
                className="groupUserImage"
                src="/assets/images/night.png"
                alt=""
              />
            </div>
          </GroupInfoWrapper>
        </DetailInfoWrapper>
      </div>
    </DetailBoxWrapper>
  );
}
