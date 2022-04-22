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
import ProgressBar from './ProgressBar';

const Box = props => {
  const [boxHeight, setBoxHeight] = useState();
  const Height = useRef();

  useEffect(() => {
    setBoxHeight(Height.current.clientHeight);
  }, []);

  console.log(boxHeight);

  return (
    <BoxWrapper
      ref={Height}
      click={props.click}
      Height={boxHeight}
      firstClick={props.firstClick}
    >
      <div className={props.click ? 'off' : 'on'}>
        <ContentWrapper>
          <LeftContent />
          <RightContent>
            <div className="contentGroup">
              <p>우리들의 추억여행</p>
              <h4>내용</h4>
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
                <div>2022.05.27 </div>
                <DdayButton />
              </div>
              <div className="user">
                <img
                  className="userImage"
                  src="/assets/images/mobileNight.png"
                  alt=""
                />
                <img
                  className="userImage"
                  src="/assets/images/mobileNight.png"
                  alt=""
                />
                <img
                  className="userImage"
                  src="/assets/images/mobileNight.png"
                  alt=""
                />
                <img
                  className="userImage"
                  src="/assets/images/mobileNight.png"
                  alt=""
                />
              </div>
            </div>
          </RightContent>
        </ContentWrapper>
        <ProgressBarWrapper>
          <ProgressBar />
        </ProgressBarWrapper>
      </div>
    </BoxWrapper>
  );
};

export default Box;
