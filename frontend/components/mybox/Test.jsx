/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from 'react';
// import DdayButton from './DdayButton';
// import {
//   BoxDetailContent,
//   DayWrapper,
//   DetailBoxWrapper,
//   DetailContentWrapper,
//   DetailInfoWrapper,
//   GroupInfoWrapper,
//   MapInfoWrapper,
// } from './detailBox.style';
// import {
//   ContentWrapper,
//   LeftContent,
//   ProgressBarWrapper,
//   RightContent,
// } from './Mybox.style';
// import ProgressBar from './ProgressBar';
import { TestBig, TestSmall, Cover } from './test.style';
import Box from './Box';
import DetailBox from './DetailBox';

export default function Test() {
  const [toggle, setToggle] = useState(false);
  const [click, setNextToggle] = useState(true);
  const [firstClick, setFirstClick] = useState(false);
  const [smallHeight, setSmallHeight] = useState();
  const [BigHeight, setBigHeight] = useState();
  const Height = useRef('');
  const DetailHeight = useRef('');

  function timer() {
    setTimeout(() => setToggle(!toggle), 1000);
  }

  useEffect(() => {
    if (click) {
      setSmallHeight(Height.current.clientHeight);
    } else {
      setBigHeight(DetailHeight.current.clientHeight);
    }
    console.log(smallHeight, BigHeight);
  }, [click]);

  useEffect(() => {
    if (click) {
      setSmallHeight(Height.current.clientHeight);
    } else {
      setBigHeight(DetailHeight.current.clientHeight);
    }
  }, []);

  return (
    <>
      <button
        onClick={() => {
          if (toggle === click) {
            console.log('같아서 거부');
          } else {
            setFirstClick(true);
            setNextToggle(!click);
            timer();
          }
        }}
        style={{ marginTop: '50px' }}
      >
        변겨어어어어엉
      </button>
      <Cover>
        {toggle ? (
          <TestBig
            click={click}
            firstClick={firstClick}
            ref={DetailHeight}
            Height={BigHeight}
          >
            <DetailBox className={click ? 'on' : 'off'} />
          </TestBig>
        ) : (
          <TestSmall
            click={click}
            firstClick={firstClick}
            ref={Height}
            Height={smallHeight}
          >
            <Box className={click ? 'off' : 'on'} />
          </TestSmall>
        )}
      </Cover>
    </>
  );
}
