import styled from 'styled-components';
const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
`;

const MainLeftWrapper = styled.div`
  width: 60%;
  color: white;
  padding: 80px 0 0 80px;
  display: flex;
  flex-direction: column;
  word-break: keep-all; // 단어단위로 끊기
  .d-day {
    margin-bottom: 30px;
    font-size: 25px;
    .time {
      font-size: 28px;
    }
  }
  .title {
    width: 50%;
    margin-bottom: 30px;
    font-size: 60px;
  }
  .content {
    font-size: 20px;
    width: 60%;
  }
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const MainRightWrapper = styled.div`
  padding-top: 80px;
  width: 850px;
  background-color: rgba(255, 255, 255, 0.2); // 배경 투명도
  display: flex;
  flex-direction: column;
`;
const ProgressWrapper = styled.div`
  margin: 0 30px 30px 30px;
  .icon {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
  }
`;
const VideoWrapper = styled.div`
  height: 60vh;
  background-color: black;
  margin-bottom: 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 20px;
  color: white;
  .leftBtn {
    cursor: pointer;
  }
  .rightBtn {
    cursor: pointer;
  }
`;

const MobileWrapper = styled.div`
  display: none;
  @media screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
    padding: 30px 10px 10px 10px;
    color: white;
    word-break: keep-all; // 단어단위로 끊기
    .d-day {
      margin-bottom: 10px;
      font-size: 17px;
      .time {
        font-size: 17px;
      }
    }
    .title {
      margin-bottom: 10px;
      font-size: 40px;
    }
    .content {
      font-size: 15px;
    }
  }
`;

export {
  MainWrapper,
  MainLeftWrapper,
  MainRightWrapper,
  VideoWrapper,
  ButtonWrapper,
  MobileWrapper,
  ProgressWrapper,
};
