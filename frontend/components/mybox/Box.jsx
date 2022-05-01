/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from 'react';
import {
  BoxWrapper,
  ContentWrapper,
  LeftContent,
  RightContent,
  ProgressBarWrapper,
} from './Mybox.style';

import DdayButton from './DdayButton';
import ProgressBar from '../Main/ProgressBar';
import { IoIosArrowDown, IoIosArrowUp, IoMdAdds } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';

const Box = props => {
  const today = new Date();
  const Dday = new Date(props.boxInfo.boxOpenAt);
  const distance = Dday.getTime() - today.getTime();
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const StartDay = new Date(props.boxInfo.boxCreatedAt);
  const totalDayLenght = Dday.getTime() - StartDay.getTime();
  const [userlength, setUserlength] = useState(false);

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
          <p style={{ marginRight: '5px' }}>...</p>
          {userInfo.map((value, i) => {
            return (
              <>
                {value.userProfileImage ? (
                  <img className="userImage" src={value.userProfileImage} />
                ) : (
                  <img src="혼구리2.png" alt="사진없노" />
                )}
              </>
            );
          })}
          <div className="plusButton"></div>
        </>
      );
    } else {
      return props.boxInfo.user.map((value, i) => {
        return (
          <>
            {value.userProfileImage ? (
              <img className="userImage" src={value.userProfileImage} />
            ) : (
              <img src="혼구리2.png" alt="사진없노" />
            )}
          </>
        );
      });
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
          <LeftContent />
          <RightContent>
            <div className="contentGroup">
              {/* <p>{props.boxInfo.boxName}</p> */}
              <p>
                으아아아아 으아아아아 으아아아아 으아아아아 으아아아아
                으아아아아 으아아아아 으아아아아{' '}
              </p>
              {/* <h4>{props.boxInfo.boxDescription}</h4> */}
            </div>
            <div className="dayGroup">
              <div
                className="toggleButton"
                onClick={() => {
                  props.set(props.num);
                }}
              >
                <IoIosArrowDown />
                {/* {click ? <IoIosArrowDown /> : <IoIosArrowUp />} */}
              </div>
              <div className="state">
                <div>{props.boxInfo.boxOpenAt.slice(0, 10)}</div>
                <DdayButton day={day} num={props.num} />
              </div>
              <div className="user">{userSlice()}</div>
            </div>
          </RightContent>
        </ContentWrapper>
        {/* <ProgressBarWrapper> */}
        <ProgressBar percent={getPercent()} />
        {/* </ProgressBarWrapper> */}
      </div>
    </BoxWrapper>
  );
};

export default Box;

// console.log(props.boxInfo.boxOpenAt.slice(0, 4));
//   const openYear = props.boxInfo.boxOpenAt.slice(0, 4);
//   const openMonth = props.boxInfo.boxOpenAt.slice(5, 7);
//   const openDay = props.boxInfo.boxOpenAt.slice(8, 10);
//   console.log(openDay, openMonth, openYear);
//   console.log(days, month, year);

//   // 남은 day 계산. 열린 경우, 안열린 경우
//   const leftYear = Number(openYear) - year;
//   const leftMonth = Number(openMonth) - Number(month);
//   const leftDays = Number(openDay) - Number(days);
//   console.log(leftYear, leftMonth, leftDays);
//   if (leftMonth < 0) {
//     leftYear -= 1;
//   }
