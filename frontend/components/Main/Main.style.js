import styled from 'styled-components';
const MainWrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  justify-content: flex-end;

  @media (max-width: 850px) {
    position: absolute;
    height: auto;
    top: 60px;
    bottom: 0;
  }
`;

const MainLeftWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  color: white;
  padding: 5vw 0 0 4vw;
  display: flex;
  flex-direction: column;
  word-break: keep-all; // 단어단위로 끊기
  .d-day {
    font-size: 25px;
    .time {
      font-size: 28px;
    }
  }
  .title {
    width: 50%;
    font-size: 60px;
  }
  .content {
    font-size: 20px;
    width: 60%;
  }
  @media (max-width: 850px) {
    display: none;
  }
`;

const MainRightWrapper = styled.div`
  box-sizing: border-box; // 전역에는 되어있음
  overflow: auto; // 부모요소의 높이를 자식요소의 높이로 맞춰줌
  padding: 80px 0 30px 0;
  width: 45%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2); // 배경 투명도
  display: flex;
  flex-direction: column;
  @media (max-width: 850px) {
    height: 100%;
    width: 850px;
    position: relative;
    padding-top: 30px;
  }
`;
const ProgressWrapper = styled.div`
  margin: 0 30px 30px 30px;
  .icon {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
  }
  .css-1l6rwmg-MuiLinearProgress-root.MuiLinearProgress-colorPrimary {
    // progressbar z-index 뒤로
    z-index: -1;
  }
`;
const VideoWrapper = styled.div`
  margin: 10px;
  border-radius: 1vw;
  background-color: transparent;
  margin-bottom: 10px;
  div {
    color: white;
    height: 60vh;
    img {
      border-radius: 1vw;
      width: 100%;
      height: 100%;
    }
  }
  @media (max-width: 850px) {
    div {
      height: 300px;
    }
  }
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
  @media (max-width: 850px) {
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
const MainPageWrapper = styled.div`
  ul {
    white-space: nowrap;
  }
  li {
    display: inline-block;
  }
  .section input {
    display: none;
  }
  .section .sliderwrap {
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .section .slidelist {
    white-space: nowrap;
    font-size: 0;
  }
  .section .slidelist > li {
    display: inline-block;
    vertical-align: middle;
    transition: all 0.5s;
  }
  .section .slidelist > li > a {
    display: block;
    position: relative;
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
  MainPageWrapper,
};
