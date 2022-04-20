import React from 'react';
import { BoxWrapper } from './Mybox.style';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  width: 95%;
  display: flex;
  height: 125px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

const LeftContent = styled.div`
  width: 25%;
  /* min-width: 125px; */
  height: 100%;
  background-image: url('assets/images/box/openBox.png');
  background-size: cover;
  background-position: center;
  @media ${props => props.theme.mobile} {
    width: 35%;
  }
`;

const RightContent = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  @media ${props => props.theme.mobile} {
    width: 65%;
  }
  /* background-color: green; */
  /* 콘텐츠들의 overflow를 방지한다. */
  .contentGroup {
    width: 100%;
    background-color: pink;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;

    h2 {
      margin: 0px;
    }

    .state {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin: 0 0 0 auto;
    }
  }
`;

const ProgressBarWrapper = styled.div`
  width: 95%;
  height: 20px;
  margin: 0 auto;
  background-color: red;
`;

const Box = () => {
  return (
    <BoxWrapper>
      <ContentWrapper>
        <LeftContent />
        <RightContent>
          <div className="contentGroup">
            <h2>Title</h2>
            contentcontentcontentcontentcontentcontentcontentcontentcontentcontent
          </div>
          <div className="contentGroup">
            <div className="state">
              <div>2022.05.27 </div>
              <div>버튼</div>
            </div>
          </div>
        </RightContent>
      </ContentWrapper>
      <ProgressBarWrapper></ProgressBarWrapper>
    </BoxWrapper>
  );
};

export default Box;
