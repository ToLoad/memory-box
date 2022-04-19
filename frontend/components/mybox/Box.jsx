import React from 'react';
import { BoxWrapper } from './Mybox.style';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  width: 95%;
  display: flex;
  height: 115px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

const LeftContent = styled.div`
  width: 25%;
  min-width: 125px;
  height: 100%;
  background-color: green;
  background-image: url('assets/images/box/openBox.png');
  background-size: cover;
  background-position: center;
`;

const RightContent = styled.div`
  width: 75%;
  height: 100%;
  background-color: pink;
`;

const ProgressBarWrapper = styled.div`
  width: 95%;
  height: 35px;
  margin: 0 auto;
  background-color: red;
`;

const Box = () => {
  return (
    <BoxWrapper>
      <ContentWrapper>
        <LeftContent />
        <RightContent>하이</RightContent>
      </ContentWrapper>
      <ProgressBarWrapper></ProgressBarWrapper>
    </BoxWrapper>
  );
};

export default Box;
