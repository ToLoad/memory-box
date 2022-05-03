import styled from 'styled-components';

const BoxWrapper = styled.div`
  max-width: 700px;
  padding: 1%;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
  margin: 0 auto;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow-y: visible;
  color: white;
  height: ${props =>
    props.num === 2 ? (props.click ? '190px' : '0px') : '190px'};
  overflow: hidden;
  /* animation: ${props => (props.click ? '' : 'fadeOut 1s')}; */
  animation: ${props =>
    !props.firstClick
      ? ''
      : props.num === 2
      ? props.click
        ? 'fadeIn 1s'
        : 'fadeOut 1s'
      : null};
  .on {
    animation: ${props => (!props.firstClick ? '' : 'OutContent 1s')};
  }
  .off {
    animation: ${props => (!props.firstClick ? '' : 'InContent 1s')};
  }
  @keyframes fadeIn {
    from {
      height: 10px;
    }
    to {
      height: 180px;
    }
  }
  @keyframes fadeOut {
    from {
      height: 180px;
    }
    to {
      height: 10px;
    }
  }
  @keyframes OutContent {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-200px);
    }
  }

  @keyframes InContent {
    from {
      transform: translateY(-200px);
    }
    to {
      transform: translateY(0px);
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 125px;
  margin: 0 auto;
  flex-direction: row;
`;

const LeftContent = styled.div`
  width: 25%;
  height: 100%;
  /* background-image:  url('assets/images/closeBox.png'); */
  background-image: ${props =>
    props.num === 2 || props.num === 1
      ? `url('assets/images/closeBox.png')`
      : `url('assets/images/openBox.png')`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const RightContent = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /* 콘텐츠들의 overflow를 방지한다. */

  .contentGroup {
    width: 60%;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;

    p {
      margin: 0px;
      font-size: 30px;
      font-weight: 900;
      @media ${props => props.theme.mobile} {
        font-size: 20px;
      }
    }

    h4 {
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
    }

    .state {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  .dayGroup {
    width: 40%;
    padding: 10px;
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    position: relative;
    margin-right: 15px;
    .state {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      @media ${props => props.theme.mobile} {
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
      }
    }
    .toggleButton {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 9px;
      right: -15px;
      border-radius: 10px;
      cursor: pointer;
      @media ${props => props.theme.mobile} {
        top: 13px;
      }
    }
    .plusButton {
      position: absolute;
      /* background-color: red; */
      top: 60px;
      height: 30px;
      right: -12px;
      border-radius: 10px;
      cursor: pointer;
      @media ${props => props.theme.mobile} {
        top: 76px;
        right: -11px;
      }
    }
    .user {
      width: 100%;
      height: 100%;
      margin: 0 0 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      /* overflow: hidden; */

      img {
        width: 35px;
        height: 35px;
        min-width: 35px;
        margin: 10px 3px;
        border-radius: 100%;
        z-index: 2;
        @media ${props => props.theme.mobile} {
          width: 20px;
          height: 20px;
          min-width: 20px;
        }
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  /* width: 80px; */
  min-width: 50px;
  height: 30px;
  background-color: ${props => props.color};
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  @media ${props => props.theme.mobile} {
    margin-top: 5px;
  }
`;

const ButtonContent = styled.div`
  width: 100%;
  height: 100%;
  font-size: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 1000;
  /* margin: auto; */
`;

const ProgressBarWrapper = styled.div`
  width: 95%;
  height: 15px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
`;

const ProgressBarContent = styled.div`
  width: 30%;
  height: 100%;
  background-color: red;
  border-radius: 10px;
`;

export {
  BoxWrapper,
  ContentWrapper,
  LeftContent,
  RightContent,
  ProgressBarWrapper,
  ButtonWrapper,
  ButtonContent,
  ProgressBarContent,
};
