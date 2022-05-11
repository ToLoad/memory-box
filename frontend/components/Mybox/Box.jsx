/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  BoxWrapper,
  ContentWrapper,
  LeftContent,
  RightContent,
} from './Mybox.style';
import BoxUserList from '../Userlist/BoxUserList';

import DdayButton from './DdayButton';
import ProgressBar from '../Main/ProgressBar';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import UserProfile from './UserProfile';
import { Tooltip } from '@mui/material';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { BsPlusLg } from 'react-icons/bs';
import moment from 'moment';

const Box = props => {
  const [modal, setModal] = useState(false);

  const today = new Date();
  const Dday = new Date(props.boxInfo.boxOpenAt.replace(/-/g, '/'));
  // const distance = Dday.getTime() - today.getTime();
  // const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  // const StartDay = new Date(props.boxInfo.boxCreatedAt);
  // const totalDayLenght = Dday.getTime() - StartDay.getTime();
  // const today = moment(new Date());
  // const Dday = moment(new Date(props.boxInfo.boxOpenAt));
  // console.log(today, Dday);
  const distance = moment(Dday.getTime()) - moment(today.getTime());
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const StartDay = new Date(props.boxInfo.boxCreatedAt.replace(/-/g, '/'));
  const totalDayLenght = Dday.getTime() - StartDay.getTime();

  // const testDay = moment(props.boxInfo.boxOpenAt).fromNow(true);

  // 도착 날짜
  function getPercent() {
    const StartDay = new Date(props.boxInfo.boxCreatedAt.replace(/-/g, '/'));
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

  function userSlice() {
    if (props.boxInfo.user.length > 4) {
      const userInfo = props.boxInfo.user.slice(0, 4);
      return (
        <>
          {/* <p style={{ marginRight: '5px' }}>...</p> */}
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

  function headIcon() {
    // return <AiOutlinePlus />;
    return (
      <div
        className="toggleButton"
        onClick={e => {
          e.stopPropagation();
          props.nextToggle();
        }}
      >
        <IoIosArrowDown />
      </div>
    );
  }

  const showModal = e => {
    setModal(true);
    e.stopPropagation();
  };

  const handleCancel = e => {
    setModal(false);
    e.stopPropagation();
  };

  return (
    <BoxWrapper
      click={props.click}
      firstClick={props.firstClick}
      num={props.num}
    >
      <div
        className={props.click ? 'off' : 'on'}
        onClick={() => props.set(props.num)}
      >
        <ContentWrapper>
          <LeftContent num={props.num} />
          <RightContent>
            <div className="contentGroup">
              <p>{props.boxInfo.boxName}</p>
            </div>
            <div className="dayGroup">
              {headIcon()}
              <div className="state">
                <div>{props.boxInfo.boxOpenAt.slice(0, 10)}</div>
                <DdayButton day={day} num={props.num} />
              </div>
              <div className="user">
                {userSlice()}
                <Tooltip title="유저 더보기" placement="top">
                  <div className="plusButton">
                    <MdMoreVert onClick={e => showModal(e)} />
                  </div>
                </Tooltip>
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
            </div>
          </RightContent>
        </ContentWrapper>

        <ProgressBar percent={getPercent()} />
      </div>
    </BoxWrapper>
  );
};

export default Box;
