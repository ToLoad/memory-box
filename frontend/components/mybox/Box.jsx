import React from 'react';
import {
  BoxWrapper,
  ContentWrapper,
  LeftContent,
  RightContent,
  ProgressBarWrapper,
} from './Mybox.style';

import DdayButton from './DdayButton';
import ProgressBar from './ProgressBar';

const Box = () => {
  return (
    <BoxWrapper>
      <ContentWrapper>
        <LeftContent />
        <RightContent>
          <div className="contentGroup">
            <p>우리들의 추억여행</p>
            <h4>내용</h4>
          </div>
          <div className="dayGroup">
            <div className="toggleButton">++</div>
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
    </BoxWrapper>
  );
};

export default Box;
