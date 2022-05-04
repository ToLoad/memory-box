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
import { IoIosArrowUp } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';
import UserProfile from './UserProfile';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import BoxUserList from '../userlist/BoxUserList';
import { Tooltip } from '@mui/material';

export default function DetailBox(props) {
  const [mapInfo, setMapInfo] = useState(true);
  const [compoH, setCompoH] = useState('');
  const [modal, setModal] = useState(false);

  const today = new Date();
  const Dday = new Date(props.boxInfo.boxOpenAt);
  const distance = Dday.getTime() - today.getTime();
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const StartDay = new Date(props.boxInfo.boxCreatedAt);
  const totalDayLenght = Dday.getTime() - StartDay.getTime();

  const showModal = () => {
    setModal(true);
  };

  const handleCancel = () => {
    setModal(false);
  };

  function getPercent() {
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
  // 지도있을 때 600, 사람 수 20명까지 보이게
  // 지도 없을 때
  function anmationHeight() {
    if (mapInfo) {
      return '620px';
    } else {
      return '450px';
    }
  }

  function animationMheigth() {
    if (mapInfo) {
      const defaultLength = 630;
      const maplen = props.boxInfo.user.length / 8;
      const deskheight = Math.round(maplen);
      const result = defaultLength + 40 * deskheight;
      String(result) + 'px';
      return String(result) + 'px';
    } else {
      const defaultLength = 420;
      const mobilelen = props.boxInfo.user.length / 12;
      const mobileheight = Math.round(mobilelen);
      const result = defaultLength + 40 * mobileheight;
      return String(result) + 'px';
    }
  }

  function userSlice() {
    if (props.boxInfo.user.length > 20) {
      const userInfo = props.boxInfo.user.slice(0, 20);
      return (
        <>
          ...
          {userInfo.map((value, i) => {
            return <UserProfile value={value} />;
          })}
        </>
      );
    } else {
      return props.boxInfo.user.map((value, i) => {
        return <UserProfile value={value} />;
      });
    }
  }

  function MapLocation() {
    if (props.boxInfo.boxLocLat === 0 && props.boxInfo.boxLocLng === 0) {
      setMapInfo(false);
    }
  }

  return (
    <DetailBoxWrapper
      id="container"
      click={props.click}
      firstClick={props.firstClick}
      num={props.num}
      className={props.click ? 'on' : 'off'}
      map={mapInfo}
      height={anmationHeight()}
      mobileHeight={animationMheigth()}
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
                <IoIosArrowUp />
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
            <div className="textcontent">
              <p>함께 한 사람</p>
              <MdMoreVert
                className="icon"
                style={{ marginTop: '3px' }}
                onClick={showModal}
              />
              <Modal
                title="유저목록"
                visible={modal}
                onCancel={handleCancel}
                footer={null}
              >
                <BoxUserList user={props.boxInfo.user} value={props.boxInfo} />
              </Modal>
            </div>
            <div className="group">{userSlice()}</div>
          </GroupInfoWrapper>
        </DetailInfoWrapper>
      </div>
    </DetailBoxWrapper>
  );
}
