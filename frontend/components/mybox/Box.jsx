/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  BoxWrapper,
  ContentWrapper,
  LeftContent,
  RightContent,
} from './Mybox.style';

import DdayButton from './DdayButton';
import ProgressBar from '../Main/ProgressBar';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import UserProfile from './UserProfile';
import { Tooltip } from '@mui/material';

const Box = props => {
  const today = new Date();
  const Dday = new Date(props.boxInfo.boxOpenAt);
  const distance = Dday.getTime() - today.getTime();
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const StartDay = new Date(props.boxInfo.boxCreatedAt);
  const totalDayLenght = Dday.getTime() - StartDay.getTime();

  function getPercent() {
    const StartDay = new Date(props.boxInfo.boxCreatedAt);
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

  function userSlice() {
    if (props.boxInfo.user.length > 4) {
      const userInfo = props.boxInfo.user.slice(0, 4);
      return (
        <>
          {/* <p style={{ marginRight: '5px' }}>...</p> */}
          {userInfo.map((value, i) => {
            return <UserProfile value={value} />;
          })}
          <Tooltip title="유저 더보기" placement="top">
            <div className="plusButton">
              <MdMoreVert />
            </div>
          </Tooltip>
        </>
      );
    } else {
      return props.boxInfo.user.map((value, i) => {
        return <UserProfile value={value} />;
      });
    }
  }

  function headIcon() {
    switch (props.num) {
      case 2:
        if (props.click === true) {
          return <IoIosArrowDown />;
        } else {
          return <IoIosArrowUp />;
        }
      default:
        return <AiOutlinePlus />;
    }
  }
  return (
    <BoxWrapper
      click={props.click}
      firstClick={props.firstClick}
      num={props.num}
    >
      <div className={props.click ? 'off' : 'on'}>
        <ContentWrapper>
          <LeftContent num={props.num} />
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
                {headIcon()}
              </div>
              <div className="state">
                <div>{props.boxInfo.boxOpenAt.slice(0, 10)}</div>
                <DdayButton day={day} num={props.num} />
              </div>
              <div className="user">{userSlice()}</div>
            </div>
          </RightContent>
        </ContentWrapper>

        <ProgressBar percent={getPercent()} />
      </div>
    </BoxWrapper>
  );
};

export default Box;
