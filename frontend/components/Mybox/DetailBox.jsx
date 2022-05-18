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
  ButtonWrapper,
  ButtonContent,
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
  ButtonGroup,
} from './detailBox.style';
import Map from '../Map/Map';
import { IoIosArrowUp } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';
import UserProfile from './UserProfile';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import BoxUserList from '../Userlist/BoxUserList';
import { useMutation, useQueryClient } from 'react-query';
import { putHideBox, putShowBox } from '../../api/box';
import Swal from 'sweetalert2';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { ProgressWrapper } from '../Main/Main.style';

export default function DetailBox(props) {
  const [modal, setModal] = useState(false);
  const today = new Date();
  const Dday = new Date(props.boxInfo.boxOpenAt.replace(/-/g, '/'));
  const distance = Dday.getTime() - today.getTime();
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const StartDay = new Date(props.boxInfo.boxCreatedAt.replace(/-/g, '/'));
  const totalDayLenght = Dday.getTime() - StartDay.getTime();
  const queryClient = useQueryClient();
  const hideBoxApi = useMutation(
    ['hidebox', props.boxInfo.boxId],
    async () => {
      return putHideBox(props.boxInfo.boxId);
    },
    {
      onSuccess: res => {
        // console.log('성공');
        queryClient.invalidateQueries('alldata');
      },
      onError: err => {
        console.log(err, '실패');
      },
    },
  );

  const showBoxApi = useMutation(
    ['showbox', props.boxInfo.boxId],
    async () => {
      return putShowBox(props.boxInfo.boxId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('hidedata');
      },
    },
  );

  const showModal = e => {
    setModal(true);
    e.stopPropagation();
  };

  const handleCancel = e => {
    setModal(false);
    e.stopPropagation();
  };

  const MapClick = e => {
    e.stopPropagation();
  };

  function getPercent() {
    const Dday = new Date(props.boxInfo.boxOpenAt.replace(/-/g, '/'));
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
      const defaultLength = 430;
      const mobilelen = props.boxInfo.user.length / 15;
      const mobileheight = Math.floor(mobilelen);
      console.log(mobileheight, '모헤');
      const result = defaultLength + 30 * mobileheight;
      return `${String(result)}px`;
    }
    const defaultLength = 610;
    const maplen = props.boxInfo.user.length / 6;
    const deskheight = Math.floor(maplen);
    const result = defaultLength + 40 * deskheight;
    return `${String(result)}px`;
  }

  function animationMheigth() {
    if (props.boxInfo.boxLocLat !== 0 && props.boxInfo.boxLocLng !== 0) {
      const defaultLength = 660;
      const maplen = props.boxInfo.user.length / 8;
      const deskheight = Math.floor(maplen);
      const result = defaultLength + 40 * deskheight;
      return `${String(result)}px`;
    }
    const defaultLength = 430;
    const mobilelen = props.boxInfo.user.length / 7;
    const mobileheight = Math.floor(mobilelen);
    const result = defaultLength + 35 * mobileheight;
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

  // 카테고리 넘버가 4번이면 --> 보여주기작동
  function hideShowBox(e) {
    e.stopPropagation();
    if (props.categori !== 4) {
      Swal.fire({
        title: '숨기기',
        text: '현재 상자를 숨기시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '숨기기',
        cancelButtonText: '취소',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        preConfirm: () => {
          hideBoxApi.mutate();
        },
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '숨겨졌어요!',
            text: '기억 상자가 숨겨졌어요! 마이페이지에서 다시 꺼낼 수 있어요!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          });
        }
      });
    } else {
      Swal.fire({
        title: '숨김 취소',
        text: '숨긴 기억함을 되돌리시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '되돌리기',
        cancelButtonText: '취소',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        preConfirm: () => {
          showBoxApi.mutate();
        },
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '돌아갔어요!',
            text: "기억함이 원래 자리로 돌아갔어요! '나의상자' 에서 확인이 가능해요!",
            icon: 'success',
            confirmButtonColor: '#3085d6',
          });
        }
      });
    }
  }

  function hideShowButton() {
    // 숨겨진 조회의 경우 카테고리 넘버 4
    // 아닐 경우 숨기기 버튼이 보이고,
    // 숨겨진 상자 조회의 경우 보이기 버튼이 return 되어야한다,
    if (props.categori !== 4) {
      return (
        <div className="state hide">
          <ButtonWrapper
            color="red"
            onClick={e => {
              hideShowBox(e);
            }}
          >
            <ButtonContent>숨기기</ButtonContent>
          </ButtonWrapper>
        </div>
      );
    }
    return (
      <div className="state hide">
        <ButtonWrapper
          color="blue"
          onClick={e => {
            hideShowBox(e);
          }}
        >
          <ButtonContent>보이기</ButtonContent>
        </ButtonWrapper>
      </div>
    );
  }
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
          onClick={() => props.set(props.num)}
        >
          <div className={props.click ? 'on' : 'off'}>
            {/* <button onClick={() => setMapInfo(!mapInfo)}>하잉</button> */}
            <ContentWrapper>
              <LeftContent num={props.num} />
              <RightContent>
                <div className="contentGroup">
                  <p>{props.boxInfo.boxName}</p>
                </div>
                <div className="dayGroup">
                  <div
                    className="toggleButton"
                    onClick={e => {
                      props.nextToggle();
                      e.stopPropagation();
                    }}
                  >
                    <IoIosArrowUp />
                  </div>
                  <ButtonGroup>
                    {/* 숨기기 있던자리 */}
                    {hideShowButton()}
                    <div className="state">
                      <DdayButton day={day} num={props.num} />
                    </div>
                  </ButtonGroup>
                </div>
              </RightContent>
            </ContentWrapper>
            <ProgressBar percent={getPercent()} />
            <DayWrapper>
              <div className="date">
                {props.boxInfo.boxCreatedAt.slice(0, 13)}시
              </div>
              <div className="date">
                {props.boxInfo.boxOpenAt.slice(0, 13)}시
              </div>
            </DayWrapper>

            <DetailContentWrapper onClick={props.nextToggle}>
              <BoxDetailContent>
                <p>{props.boxInfo.boxDescription}</p>
              </BoxDetailContent>
            </DetailContentWrapper>
            <DetailInfoWrapper onClick={e => MapClick(e)}>
              {props.boxInfo.boxLocLat !== 0 &&
              props.boxInfo.boxLocLng !== 0 ? (
                <MapInfoWrapper>
                  <p>묻은 위치</p>
                  <Map
                    className="map"
                    lat={props.boxInfo.boxLocLat}
                    lng={props.boxInfo.boxLocLng}
                    id={`map${props.boxInfo.boxId}`}
                    boxid={props.boxInfo.boxId}
                    name={props.boxInfo.boxLocAddress}
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
          onClick={() => props.set(props.num)}
        >
          <div className={props.click ? 'on' : 'off'}>
            {/* <button onClick={() => setMapInfo(!mapInfo)}>하잉</button> */}
            <ContentWrapper>
              <LeftContent num={props.num} />
              <RightContent>
                <div className="contentGroup">
                  <p>{props.boxInfo.boxName}</p>
                </div>
                <div className="dayGroup">
                  <div
                    className="toggleButton"
                    onClick={e => {
                      props.nextToggle();
                      e.stopPropagation();
                    }}
                  >
                    <IoIosArrowUp />
                  </div>
                  <ButtonGroup>
                    {hideShowButton()}
                    <div className="state">
                      <DdayButton day={day} num={props.num} />
                    </div>
                  </ButtonGroup>
                </div>
              </RightContent>
            </ContentWrapper>
            <ProgressBar percent={getPercent()} />
            <DayWrapper>
              <div className="date">
                {props.boxInfo.boxCreatedAt.slice(0, 13)}시
              </div>
              <div className="date">
                {props.boxInfo.boxOpenAt.slice(0, 13)}시
              </div>
            </DayWrapper>
            <DetailContentWrapper>
              <BoxDetailContent>
                <p>{props.boxInfo.boxDescription}</p>
              </BoxDetailContent>
            </DetailContentWrapper>
            <DetailInfoWrapper onClick={e => MapClick(e)}>
              {props.boxInfo.boxLocLat !== 0 &&
              props.boxInfo.boxLocLng !== 0 ? (
                <MapInfoWrapper>
                  <p>묻은 위치</p>
                  <Map
                    className="map"
                    lat={props.boxInfo.boxLocLat}
                    lng={props.boxInfo.boxLocLng}
                    id={`map${props.boxInfo.boxId}`}
                    boxid={props.boxInfo.boxId}
                    name={props.boxInfo.boxLocAddress}
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
