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
  NoMapBoxWrapper,
} from './detailBox.style';
import Map from '../Map/Map';
import { IoIosArrowUp } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';
import UserProfile from './UserProfile';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import BoxUserList from '../userlist/BoxUserList';

export default function DetailBox(props) {
  const [modal, setModal] = useState(false);
  const [he, setHe] = useState('');
  const [mhe, setMhe] = useState('');

  const today = new Date();
  const Dday = new Date(props.boxInfo.boxOpenAt);
  const distance = Dday.getTime() - today.getTime();
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const StartDay = new Date(props.boxInfo.boxCreatedAt);
  const totalDayLenght = Dday.getTime() - StartDay.getTime();

  const showModal = e => {
    setModal(true);
    e.stopPropagation();
  };

  const handleCancel = e => {
    setModal(false);
    e.stopPropagation();
  };

  function getPercent() {
    const Dday = new Date(props.boxInfo.boxOpenAt);
    const today = new Date();
    const distance = Dday.getTime() - today.getTime();
    if (today.getTime() > Dday.getTime()) {
      return 100;
    }
    const leftDay = ((totalDayLenght - distance) / totalDayLenght) * 100;
    const leftDayPer = Math.floor(leftDay);
    return leftDayPer;
  }
  // 지도있을 때 600, 사람 수 20명까지 보이게
  // 지도 없을 때
  function anmationHeight() {
    if (props.boxInfo.boxLocLat === 0 && props.boxInfo.boxLocLng === 0) {
      return '450px';
    }
    return '620px';
  }

  function animationMheigth() {
    if (props.boxInfo.boxLocLat !== 0 && props.boxInfo.boxLocLng !== 0) {
      const defaultLength = 680;
      const maplen = props.boxInfo.user.length / 8;
      const deskheight = Math.floor(maplen);
      const result = defaultLength + 40 * deskheight;
      return `${String(result)}px`;
    }
    const defaultLength = 420;
    const mobilelen = props.boxInfo.user.length / 12;
    const mobileheight = Math.floor(mobilelen);
    const result = defaultLength + 40 * mobileheight;
    return `${String(result)}px`;
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
  // onClick={props.nextToggle}
  // useEffect(() => {
  //   setMhe(animationMheigth());
  //   setHe(anmationHeight());
  // }, []);

  return (
    <>
      {props.boxInfo.boxLocLat !== 0 && props.boxInfo.boxLocLng !== 0 ? (
        <DetailBoxWrapper
          click={props.click}
          firstClick={props.firstClick}
          num={props.num}
          // className={props.click ? 'on' : 'off'}
          map={
            !!(props.boxInfo.boxLocLat !== 0 && props.boxInfo.boxLocLng !== 0)
          }
          Dheight={anmationHeight()}
          DmobileHeight={animationMheigth()}
          onClick={props.nextToggle}
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
                    onClick={e => {
                      props.set(props.num);
                      e.stopPropagation();
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
              <div className="date">
                {props.boxInfo.boxCreatedAt.slice(0, 10)}
              </div>
              <div className="date">{props.boxInfo.boxOpenAt.slice(0, 10)}</div>
            </DayWrapper>

            <ProgressBar percent={getPercent()} />

            <DetailContentWrapper onClick={props.nextToggle}>
              <BoxDetailContent>
                <p>{props.boxInfo.boxDescription}</p>
              </BoxDetailContent>
            </DetailContentWrapper>
            <DetailInfoWrapper>
              {props.boxInfo.boxLocLat !== 0 &&
              props.boxInfo.boxLocLng !== 0 ? (
                <MapInfoWrapper>
                  묻은 위치
                  <Map
                    className="map"
                    lat={props.boxInfo.boxLocLat}
                    lng={props.boxInfo.boxLocLng}
                    id={`map${props.boxInfo.boxId}`}
                    boxid={props.boxInfo.boxId}
                  />
                </MapInfoWrapper>
              ) : null}

              <GroupInfoWrapper
                mapInfo={
                  props.boxInfo.boxLocLat !== 0 && props.boxInfo.boxLocLng !== 0
                }
              >
                <div className="textcontent">
                  <p>함께 한 사람</p>
                  <MdMoreVert
                    className="icon"
                    style={{ marginTop: '3px' }}
                    onClick={e => showModal(e)}
                  />
                  <Modal
                    title="유저목록"
                    visible={modal}
                    onCancel={e => handleCancel(e)}
                    footer={null}
                  >
                    <BoxUserList
                      user={props.boxInfo.user}
                      value={props.boxInfo}
                    />
                  </Modal>
                </div>
                <div className="group">{userSlice()}</div>
              </GroupInfoWrapper>
            </DetailInfoWrapper>
          </div>
        </DetailBoxWrapper>
      ) : (
        <NoMapBoxWrapper
          id="container"
          click={props.click}
          firstClick={props.firstClick}
          num={props.num}
          // className={props.click ? 'on' : 'off'}
          map={
            !!(props.boxInfo.boxLocLat !== 0 && props.boxInfo.boxLocLng !== 0)
          }
          sheight={anmationHeight()}
          smobileHeight={animationMheigth()}
          onClick={props.nextToggle}
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
                    onClick={e => {
                      props.set(props.num);
                      e.stopPropagation();
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
              <div className="date">
                {props.boxInfo.boxCreatedAt.slice(0, 10)}
              </div>
              <div className="date">{props.boxInfo.boxOpenAt.slice(0, 10)}</div>
            </DayWrapper>

            <ProgressBar percent={getPercent()} />

            <DetailContentWrapper>
              <BoxDetailContent>
                <p>{props.boxInfo.boxDescription}</p>
              </BoxDetailContent>
            </DetailContentWrapper>
            <DetailInfoWrapper>
              {props.boxInfo.boxLocLat !== 0 &&
              props.boxInfo.boxLocLng !== 0 ? (
                <MapInfoWrapper>
                  묻은 위치
                  <Map
                    className="map"
                    lat={props.boxInfo.boxLocLat}
                    lng={props.boxInfo.boxLocLng}
                    id={`map${props.boxInfo.boxId}`}
                    boxid={props.boxInfo.boxId}
                  />
                </MapInfoWrapper>
              ) : null}

              <GroupInfoWrapper
                mapInfo={
                  props.boxInfo.boxLocLat !== 0 && props.boxInfo.boxLocLng !== 0
                }
              >
                <div className="textcontent">
                  <p>함께 한 사람</p>
                  <MdMoreVert
                    className="icon"
                    style={{ marginTop: '3px' }}
                    onClick={e => showModal(e)}
                  />
                  <Modal
                    title="유저목록"
                    visible={modal}
                    onCancel={e => handleCancel(e)}
                    footer={null}
                  >
                    <BoxUserList
                      user={props.boxInfo.user}
                      value={props.boxInfo}
                    />
                  </Modal>
                </div>
                <div className="group">{userSlice()}</div>
              </GroupInfoWrapper>
            </DetailInfoWrapper>
          </div>
        </NoMapBoxWrapper>
      )}
    </>
  );
}
